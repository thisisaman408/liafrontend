import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [conversationId, setConversationId] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [historyList, setHistoryList] = useState([]);
    const [initialLoad, setInitialLoad] = useState(true);

    // Initial Fetch
    useEffect(() => {
        fetchHistoryList();
    }, [conversationId]);

    const fetchHistoryList = async () => {
        try {
            const res = await axios.get('http://localhost:8000/conversations');
            setHistoryList(res.data);
        } catch (err) {
            console.error("Failed to load history", err);
        }
    };

    const loadConversation = async (id) => {
        try {
            setLoading(true);
            setInitialLoad(true);
            const res = await axios.get(`http://localhost:8000/history/${id}`);
            setConversationId(res.data.id);
            setMessages(res.data.messages);
            setAnalysis({
                overall_sentiment: res.data.overall_sentiment,
                trend: res.data.trend
            });
        } catch (err) {
            console.error("Failed to load chat", err);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async (text) => {
        if (!text.trim()) return;
        setInitialLoad(false);

        const tempId = Date.now().toString();
        const userMsg = {
            text: text,
            sender: 'user',
            timestamp: new Date().toISOString(),
            sentiment_label: '',
            id: tempId,
        };

        setMessages(prev => [...prev, userMsg]);
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/chat', {
                message: userMsg.text,
                conversation_id: conversationId
            });

            const data = response.data;
            setConversationId(data.conversation_id);

            // Update user message with real data/sentiment
            setMessages(prev => prev.map(msg =>
                msg.id === tempId
                    ? { ...msg, sentiment_label: data.sentiment_label, sentiment_score: data.sentiment_score, id: data.match_id || msg.id }
                    : msg
            ));

            // Reload to sync ID logic fully (optional but cleaner for feedback loop)
            await loadConversation(data.conversation_id);

        } catch (error) {
            console.error("Error sending message:", error);
            const errorMsg = {
                text: "I'm having trouble connecting to the server.",
                sender: 'bot',
                timestamp: new Date().toISOString(),
                id: Date.now().toString() + 'err',
            };
            setMessages(prev => [...prev, errorMsg]);
            setLoading(false);
        }
    };

    const sendFeedback = async (msg, currentLabel) => {
        const map = { 'Positive': 'Negative', 'Negative': 'Neutral', 'Neutral': 'Positive' };
        const newLabel = map[currentLabel] || 'Neutral';

        // Optimistic Update
        setMessages(prev => prev.map(m =>
            m.id === msg.id ? { ...m, sentiment_label: newLabel, corrected_label: newLabel } : m
        ));

        try {
            await axios.post('http://localhost:8000/feedback', {
                message_id: msg.id,
                corrected_label: newLabel
            });
        } catch (err) {
            console.error("Feedback failed", err);
        }
    };

    const resetChat = () => {
        setConversationId(null);
        setMessages([]);
        setAnalysis(null);
    };

    return {
        messages,
        conversationId,
        analysis,
        loading,
        historyList,
        initialLoad,
        sendMessage,
        loadConversation,
        sendFeedback,
        resetChat
    };
};
