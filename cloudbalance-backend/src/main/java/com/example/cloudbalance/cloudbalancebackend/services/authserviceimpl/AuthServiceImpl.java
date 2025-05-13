package com.example.cloudbalance.cloudbalancebackend.services.authserviceimpl;

import com.example.cloudbalance.cloudbalancebackend.dto.request.LoginRequestDTO;
import com.example.cloudbalance.cloudbalancebackend.dto.response.*;
import com.example.cloudbalance.cloudbalancebackend.entities.*;
import com.example.cloudbalance.cloudbalancebackend.exceptions.customexceptions.ForbiddenException;
import com.example.cloudbalance.cloudbalancebackend.exceptions.customexceptions.UnauthorizedException;
import com.example.cloudbalance.cloudbalancebackend.exceptions.customexceptions.UsernameNotFoundException;
import com.example.cloudbalance.cloudbalancebackend.repositories.BlacklistTokenRepository;
import com.example.cloudbalance.cloudbalancebackend.repositories.DashboardRepository;
import com.example.cloudbalance.cloudbalancebackend.repositories.UserRepository;
import com.example.cloudbalance.cloudbalancebackend.services.AuthService;
import com.example.cloudbalance.cloudbalancebackend.services.JwtService;
import com.example.cloudbalance.cloudbalancebackend.services.userdetailsservice.UserDetailsImpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final DashboardRepository dashboardRepository;
    @Autowired
    private BlacklistTokenRepository blacklistTokenRepository;
    @Autowired
    private UserRepository userRepository;

    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           JwtService jwtService, DashboardRepository dashboardRepository){
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.dashboardRepository=dashboardRepository;
    }

    @Override
    public ResponseEntity<ApiResponseDTO<LoginResponseDTO>> login(LoginRequestDTO loginRequestDTO) {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(),
                            loginRequestDTO.getPassword()));
            if (authentication.isAuthenticated()) {
                UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
                String token = jwtService.generateToken(userDetails.getUsername(), userDetails.getAuthorities().toString());
                User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(()->
                        new UsernameNotFoundException("User not found"));

                user.setLastLogin(new Date());
                userRepository.save(user);

                LoginResponseDTO loginResponseDTO = new LoginResponseDTO(token);
                return ResponseEntity.status(HttpServletResponse.SC_OK).body(new ApiResponseDTO<>(
                        HttpServletResponse.SC_OK,
                        "Login Successful",
                        loginResponseDTO));
            }else {
                throw new UnauthorizedException("Authorization failed");
            }
    }


    @Override
    public ResponseEntity<ApiResponseDTO<?>> logout(String header){
        try {
            if (header != null && header.startsWith("Bearer ")) {
                String token = header.substring(7);
                Date expiryDate = new Date();

                BlacklistToken blacklistToken = new BlacklistToken();
                blacklistToken.setToken(token);
                blacklistToken.setExpiryDate(expiryDate);
                blacklistTokenRepository.save(blacklistToken);
                SecurityContextHolder.clearContext();
                return ResponseEntity.status(HttpServletResponse.SC_OK).body(new ApiResponseDTO<>(
                        HttpServletResponse.SC_OK,
                        "Logout successful",
                        null
                ));
            }else{
                throw new UnauthorizedException("Invalid Token!");
            }
        }catch (Exception e){
            throw new ForbiddenException("Couldn't Logout! Please try again!");
        }
    }

    @Override
    public ResponseEntity<ApiResponseDTO<?>> me(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()){
            throw new UnauthorizedException("Not Authorized to fetch user data");
        }

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(()->
                new UsernameNotFoundException("User not found"));
        List<Dashboard> dashboards = dashboardRepository.findByRole(user.getRole());
        UserInfoResponseDTO userInfoResponseDTO= getUserInfoDTO(user,dashboards);
        return ResponseEntity.status(HttpServletResponse.SC_OK).body(new ApiResponseDTO<>(
                HttpServletResponse.SC_OK,
                "User Info extracted successful",
                userInfoResponseDTO
        ));
    }

    private static UserInfoResponseDTO getUserInfoDTO(User user, List<Dashboard> dashboards){
        UserInfoResponseDTO userInfoResponseDTO = new UserInfoResponseDTO();
        List<DashboardDTO> dashboardDTOs = dashboards.stream().map(dashboard ->{
                DashboardDTO dashboardDto = new DashboardDTO();
                dashboardDto.setId(dashboard.getDashboardId());
                dashboardDto.setDashboard(dashboard.getDashboard().name());
                dashboardDto.setDisplayName(dashboard.getDisplayName());
                dashboardDto.setAccess(dashboard.getAccessType());

                return dashboardDto;
        }).toList();
        userInfoResponseDTO.setUserId(user.getUserId());
        userInfoResponseDTO.setUsername(user.getUsername());
        userInfoResponseDTO.setFirstName(user.getFirstName());
        userInfoResponseDTO.setLastName(user.getLastName());
        userInfoResponseDTO.setEmail(user.getEmail());
        userInfoResponseDTO.setRole(user.getRole().name());
        userInfoResponseDTO.setLastLogin(user.getLastLogin());
        userInfoResponseDTO.setAccounts(user.getAccounts().stream().map((account)->(
                new AccountDTO(account.getAccountId(), account.getAccountName()))).toList());
        userInfoResponseDTO.setDashboards(dashboardDTOs);

        return userInfoResponseDTO;
    }
}
