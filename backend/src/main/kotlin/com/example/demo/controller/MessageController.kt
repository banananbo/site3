package com.example.demo.controller

import com.example.demo.model.Message
import com.example.demo.service.MessageService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = ["*"])
class MessageController(private val messageService: MessageService) {
    
    @GetMapping("/hello")
    fun getHelloMessage(): ResponseEntity<Map<String, String>> {
        val message = messageService.getFirstMessage()
        return if (message != null) {
            ResponseEntity.ok(mapOf("message" to message.content))
        } else {
            ResponseEntity.ok(mapOf("message" to "No message found"))
        }
    }
} 