package com.example.cloudbalance.cloudbalance_backend.services.AuthServiceImpl;

import com.example.cloudbalance.cloudbalance_backend.dto.RequestDTO.LoginRequestDTO;
import com.example.cloudbalance.cloudbalance_backend.dto.ResponseDTO.AccountDTO;
import com.example.cloudbalance.cloudbalance_backend.dto.ResponseDTO.DashboardDTO;
import com.example.cloudbalance.cloudbalance_backend.dto.ResponseDTO.LoginResponseDTO;
import com.example.cloudbalance.cloudbalance_backend.dto.ResponseDTO.UserInfoResponseDTO;
import com.example.cloudbalance.cloudbalance_backend.entities.*;
import com.example.cloudbalance.cloudbalance_backend.repositories.BlacklistTokenRepository;
import com.example.cloudbalance.cloudbalance_backend.repositories.DashboardRepository;
import com.example.cloudbalance.cloudbalance_backend.repositories.UserRepository;
import com.example.cloudbalance.cloudbalance_backend.services.AuthService;
import com.example.cloudbalance.cloudbalance_backend.services.JwtService;
import com.example.cloudbalance.cloudbalance_backend.services.UserDetailsService.UserDetailsImpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    public ResponseEntity<?> login(LoginRequestDTO loginRequestDTO) {
        try{
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(),
                        loginRequestDTO.getPassword()));
            if (authentication.isAuthenticated()) {
                UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
                String token = jwtService.generateToken(userDetails.getUsername(), userDetails.getAuthorities().toString());
                return ResponseEntity.ok().body(new LoginResponseDTO(token));
            }
        }catch (Exception e) {
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
    }

    @Override
    public ResponseEntity<?> logout(String header){
        try {
            if (header != null && header.startsWith("Bearer ")) {
                String token = header.substring(7);
                String username = jwtService.extractUsername(token);
                Date expiryDate = new Date();

                User user = userRepository.findByUsername(username).orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));
                user.setLastLogin(expiryDate);
                userRepository.save(user);

                BlacklistToken blacklistToken = new BlacklistToken();
                blacklistToken.setToken(token);
                blacklistToken.setExpiryDate(expiryDate);
                blacklistTokenRepository.save(blacklistToken);
                SecurityContextHolder.clearContext();
                return ResponseEntity.ok("User logged out successfully");
            }
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body("invalid token");
        }catch (Exception e){
            return ResponseEntity.status(HttpServletResponse.SC_FORBIDDEN).body("Something went wrong");
        }
    }

    @Override
    public ResponseEntity<?> me(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()){
            return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED).body("Not authorized");
        }

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow(()->
                new UsernameNotFoundException("User not found"));
        List<Dashboard> dashboards = dashboardRepository.findByRole(user.getRole());
        UserInfoResponseDTO userInfoResponseDTO= getUserInfoDTO(user,dashboards);
        return ResponseEntity.ok(userInfoResponseDTO);
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
