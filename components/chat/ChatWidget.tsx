"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    MessageCircle,
    Send,
    Bot,
    User,
    Minimize2,
    Maximize2,
    X,
    Sparkles,
    Loader2,
    RefreshCw,
    Trash2,
    BarChart3,
    Lightbulb
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { sendChatMessage } from "@/lib/api"

interface Message {
    id: string
    content: string
    role: 'user' | 'assistant'
    timestamp: Date
    isTyping?: boolean
}

interface ChatWidgetProps {
    candidateId?: number
    candidateName?: string
    candidateData?: any
    sessionId?: string
    isOpen: boolean
    onToggle: () => void
    onMinimize?: () => void
}

export default function ChatWidget({
    candidateId,
    candidateName,
    candidateData,
    sessionId: initialSessionId,
    isOpen,
    onToggle,
    onMinimize
}: ChatWidgetProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const [inputMessage, setInputMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [sessionId, setSessionId] = useState<string | null>(initialSessionId || null)
    const [isMinimized, setIsMinimized] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const { toast } = useToast()

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Initialize with welcome message
            const welcomeMessage: Message = {
                id: 'welcome',
                content: `Hello! I'm your AI recruitment assistant. I can help you analyze ${candidateName || 'this candidate'} and answer questions about their profile, skills, experience, and how they might fit your role. What would you like to know?`,
                role: 'assistant',
                timestamp: new Date()
            }
            setMessages([welcomeMessage])
        }
    }, [isOpen, candidateName])

    // Update sessionId when prop changes
    useEffect(() => {
        if (initialSessionId && initialSessionId !== sessionId) {
            setSessionId(initialSessionId)
        }
    }, [initialSessionId, sessionId])

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputMessage.trim(),
            role: 'user',
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputMessage("")
        setIsLoading(true)

        // Add typing indicator
        const typingMessage: Message = {
            id: 'typing',
            content: '',
            role: 'assistant',
            timestamp: new Date(),
            isTyping: true
        }
        setMessages(prev => [...prev, typingMessage])

        try {
            const response = await sendChatMessage({
                message: userMessage.content,
                session_id: sessionId,
                temperature: 0.7,
                candidate_context: candidateData ? {
                    id: candidateId,
                    name: candidateName,
                    data: candidateData
                } : undefined
            })

            // Remove typing indicator
            setMessages(prev => prev.filter(msg => msg.id !== 'typing'))

            const assistantMessage: Message = {
                id: Date.now().toString(),
                content: response.message || response.response || response.answer || 'I apologize, but I couldn\'t process your request at the moment.',
                role: 'assistant',
                timestamp: new Date()
            }

            setMessages(prev => [...prev, assistantMessage])

            // Update session ID if provided
            if (response.session_id) {
                setSessionId(response.session_id)
            }

        } catch (error) {
            console.error('Chat error:', error)

            // Remove typing indicator
            setMessages(prev => prev.filter(msg => msg.id !== 'typing'))

            const errorMessage: Message = {
                id: Date.now().toString(),
                content: 'I apologize, but I encountered an error processing your request. Please try again.',
                role: 'assistant',
                timestamp: new Date()
            }

            setMessages(prev => [...prev, errorMessage])

            toast({
                title: "Chat Error",
                description: "Failed to send message. Please try again.",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    const clearChat = () => {
        setMessages([])
        setSessionId(null)
        toast({
            title: "Chat Cleared",
            description: "Your conversation has been cleared."
        })
    }

    const getQuickQuestions = () => [
        `Tell me about ${candidateName || 'this candidate'}'s key strengths`,
        "What are their main skills and experience?",
        "How well do they match our requirements?",
        "What questions should I ask in an interview?",
        "What are potential concerns or red flags?"
    ]

    const handleQuickQuestion = (question: string) => {
        setInputMessage(question)
    }

    if (!isOpen) return null

    return (
        <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
            }`}>
            <Card className="h-full shadow-2xl border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-umukozi-orange to-umukozi-orange-dark text-white p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">AI Assistant</h3>
                                <p className="text-sm text-white/80">
                                    {candidateName ? `Analyzing ${candidateName}` : 'Ready to help'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsMinimized(!isMinimized)}
                                className="text-white hover:bg-white/20 h-8 w-8 p-0"
                            >
                                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onToggle}
                                className="text-white hover:bg-white/20 h-8 w-8 p-0"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                {!isMinimized && (
                    <CardContent className="p-0 h-full flex flex-col">
                        {/* Messages Area */}
                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'
                                            }`}
                                    >
                                        {message.role === 'assistant' && (
                                            <Avatar className="w-8 h-8">
                                                <AvatarFallback className="bg-umukozi-orange/10 text-umukozi-orange">
                                                    <Bot className="w-4 h-4" />
                                                </AvatarFallback>
                                            </Avatar>
                                        )}

                                        <div
                                            className={`max-w-[80%] rounded-lg px-4 py-2 ${message.role === 'user'
                                                ? 'bg-umukozi-orange text-white'
                                                : 'bg-slate-100 text-slate-900'
                                                }`}
                                        >
                                            {message.isTyping ? (
                                                <div className="flex items-center gap-2">
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    <span className="text-sm">AI is thinking...</span>
                                                </div>
                                            ) : (
                                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                            )}
                                            <p className="text-xs opacity-70 mt-1">
                                                {message.timestamp.toLocaleTimeString()}
                                            </p>
                                        </div>

                                        {message.role === 'user' && (
                                            <Avatar className="w-8 h-8">
                                                <AvatarFallback className="bg-slate-200 text-slate-600">
                                                    <User className="w-4 h-4" />
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </ScrollArea>

                        {/* Quick Questions */}
                        {messages.length <= 1 && (
                            <div className="p-4 border-t bg-slate-50">
                                <p className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                                    <Lightbulb className="w-4 h-4" />
                                    Quick questions:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {getQuickQuestions().map((question, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleQuickQuestion(question)}
                                            className="text-xs h-8"
                                        >
                                            {question}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="p-4 border-t bg-white">
                            <div className="flex gap-2">
                                <Input
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask about this candidate..."
                                    disabled={isLoading}
                                    className="flex-1"
                                />
                                <Button
                                    onClick={sendMessage}
                                    disabled={!inputMessage.trim() || isLoading}
                                    className="bg-umukozi-orange hover:bg-umukozi-orange-dark"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearChat}
                                        className="text-slate-500 hover:text-slate-700 h-8"
                                    >
                                        <Trash2 className="w-4 h-4 mr-1" />
                                        Clear
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <Sparkles className="w-3 h-3" />
                                    AI Powered
                                </div>
                            </div>
                        </div>
                    </CardContent>
                )}
            </Card>
        </div>
    )
}
