package com.example.demo.service

import com.example.demo.model.Message
import com.example.demo.repository.MessageRepository
import org.springframework.stereotype.Service

@Service
class MessageService(private val messageRepository: MessageRepository) {
    
    fun getFirstMessage(): Message? {
        return messageRepository.findFirstByOrderByIdAsc()
    }
} 