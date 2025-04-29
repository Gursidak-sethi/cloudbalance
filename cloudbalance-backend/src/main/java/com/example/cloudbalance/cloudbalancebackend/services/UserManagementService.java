package com.example.cloudbalance.cloudbalancebackend.services;

import com.example.cloudbalance.cloudbalancebackend.dto.request.UserDTO;
import com.example.cloudbalance.cloudbalancebackend.dto.response.AccountDTO;
import com.example.cloudbalance.cloudbalancebackend.dto.response.ApiResponseDTO;
import com.example.cloudbalance.cloudbalancebackend.dto.response.UserInfoResponseDTO;
import com.example.cloudbalance.cloudbalancebackend.entities.Account;
import com.example.cloudbalance.cloudbalancebackend.entities.User;
import com.example.cloudbalance.cloudbalancebackend.exceptions.customexceptions.ResourceNotFoundException;
import com.example.cloudbalance.cloudbalancebackend.repositories.AccountRepository;
import com.example.cloudbalance.cloudbalancebackend.repositories.UserRepository;
import com.example.cloudbalance.cloudbalancebackend.utils.UserMapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserManagementService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    public ResponseEntity<ApiResponseDTO<?>> createUser(UserDTO userDTO){
        User user = UserMapper.toEntity(userDTO);

        List<Account> accounts = accountRepository.findAllByAccountIdIn(userDTO.getAccounts());
        user.setAccounts(accounts);
        System.out.println(user);
        if(userRepository.existsByUsername(user.getUsername())){
          throw new AccessDeniedException("Username already exists");
        }
        if(userRepository.existsByEmail(user.getEmail())){
            throw new AccessDeniedException("Email already exists");
        }
        userRepository.save(user);
        return ResponseEntity.status(HttpServletResponse.SC_CREATED).body(new ApiResponseDTO<>(
                HttpServletResponse.SC_CREATED,
                "User saved successfully",
                null
        ));
    }
    public ResponseEntity<ApiResponseDTO<List<UserInfoResponseDTO>>> getUser(){
        List<User> users = userRepository.findAll();
        if(users == null){
            throw new ResourceNotFoundException("Users not found!");
        }
        List<UserInfoResponseDTO> userResponseDTO= users.stream().map(user -> new UserInfoResponseDTO(
                user.getUserId(),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole().name(),
                user.getLastLogin(),
                user.getAccounts().stream().map(account -> (
                        new AccountDTO(account.getAccountId(), account.getAccountName())
                        )).toList(),
                null
        )).toList();

        return ResponseEntity.status(HttpServletResponse.SC_OK).body(new ApiResponseDTO<>(
                HttpServletResponse.SC_OK,
                "Users fetched successfully",
                userResponseDTO
        ));
    }

    public ResponseEntity<ApiResponseDTO<?>> updateUser(UserDTO userDTO){
        User user = userRepository.findByUsername(userDTO.getUsername())
                .orElseThrow(()-> new UsernameNotFoundException("User does not exists"));
        UserMapper.updateUserDtoToEntity(userDTO,user);
        List<Account> accounts= accountRepository.findAllByAccountIdIn(userDTO.getAccounts());
        user.setAccounts(accounts);
        userRepository.save(user);
        return ResponseEntity.status(HttpServletResponse.SC_OK).body(new ApiResponseDTO<>(
                HttpServletResponse.SC_OK,
                "User updated successfully",
                null
        ));
    }

}
