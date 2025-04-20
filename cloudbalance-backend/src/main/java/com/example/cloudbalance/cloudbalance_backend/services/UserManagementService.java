package com.example.cloudbalance.cloudbalance_backend.services;

import com.example.cloudbalance.cloudbalance_backend.dto.request.UserDTO;
import com.example.cloudbalance.cloudbalance_backend.dto.response.AccountDTO;
import com.example.cloudbalance.cloudbalance_backend.dto.response.UserInfoResponseDTO;
import com.example.cloudbalance.cloudbalance_backend.entities.Account;
import com.example.cloudbalance.cloudbalance_backend.entities.User;
import com.example.cloudbalance.cloudbalance_backend.repositories.AccountRepository;
import com.example.cloudbalance.cloudbalance_backend.repositories.UserRepository;
import com.example.cloudbalance.cloudbalance_backend.utils.UserMapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserManagementService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    public ResponseEntity<?> createUser(UserDTO userDTO){
        User user = UserMapper.toEntity(userDTO);

        List<Account> accounts = accountRepository.findAllByAccountIdIn(userDTO.getAccounts());
        user.setAccounts(accounts);
        System.out.println(user);
        if(userRepository.existsByUsername(user.getUsername())){
          return ResponseEntity.status(HttpServletResponse.SC_FORBIDDEN).body("Username already exists");
        }
        if(userRepository.existsByEmail(user.getEmail())){
            return ResponseEntity.status(HttpServletResponse.SC_FORBIDDEN).body("Email already exists");
        }
        userRepository.save(user);
        return ResponseEntity.ok("User Saved");
    }
    public ResponseEntity<?> getUser(){
        List<User> users = userRepository.findAll();
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

        return ResponseEntity.ok().body(userResponseDTO);
    }

    public ResponseEntity<?> updateUser(UserDTO userDTO){
        User user = userRepository.findByUsername(userDTO.getUsername())
                .orElseThrow(()-> new UsernameNotFoundException("User does not exists"));
        UserMapper.updateUserDtoToEntity(userDTO,user);
        List<Account> accounts= accountRepository.findAllByAccountIdIn(userDTO.getAccounts());
        user.setAccounts(accounts);
        userRepository.save(user);
        return ResponseEntity.ok("User updated successfully");
    }

}
