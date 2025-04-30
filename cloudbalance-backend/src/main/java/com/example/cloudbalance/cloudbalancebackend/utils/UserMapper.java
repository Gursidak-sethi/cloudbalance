package com.example.cloudbalance.cloudbalancebackend.utils;

import com.example.cloudbalance.cloudbalancebackend.dto.request.UserDTO;
import com.example.cloudbalance.cloudbalancebackend.entities.Role;
import com.example.cloudbalance.cloudbalancebackend.entities.User;
import com.example.cloudbalance.cloudbalancebackend.exceptions.customexceptions.BadRequestException;


public class UserMapper {
    public static User toEntity(UserDTO userDTO){
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        try {
            user.setRole(Role.valueOf(userDTO.getRole()));
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Requested Role does not exists!");
        }
        return user;
    }

    public static void updateUserDtoToEntity(UserDTO userDTO, User user){
        user.setUsername(userDTO.getUsername());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setRole(Role.valueOf(userDTO.getRole()));
    }

}
