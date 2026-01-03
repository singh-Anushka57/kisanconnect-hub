import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const { messages, language = 'en' } = await req.json();

    console.log('Chat request received:', { messageCount: messages.length, language });

    const systemPrompt = `You are KissanMitra AI, an intelligent and friendly farming assistant designed specifically for Indian farmers. Your role is to provide practical, actionable advice on agriculture, crops, weather, soil health, pest management, market prices, and farming best practices.

Guidelines:
- Be warm, respectful, and supportive in your responses
- Use simple language that is easy to understand
- Provide specific, actionable advice with quantities and timing when applicable
- Consider local Indian agricultural context and practices
- Reference common Indian crops like wheat, rice, cotton, sugarcane, vegetables, and pulses
- When discussing treatments, prefer organic solutions first, then mention chemical options
- Include traditional farming wisdom alongside modern techniques
- Be encouraging and help farmers feel confident in their decisions

If the user asks in a specific language (language code: ${language}), try to respond in that language when possible.

Common topics you can help with:
- Crop disease identification and treatment
- Soil health and nutrient management
- Pest control and prevention
- Weather-based farming decisions
- Seed selection and planting schedules
- Irrigation and water management
- Market prices and selling strategies
- Government schemes and subsidies for farmers
- Organic farming practices`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Too many requests. Please wait a moment and try again.',
          response: 'I\'m receiving too many requests right now. Please wait a moment and try again.' 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: 'Service temporarily unavailable.',
          response: 'The AI service is temporarily unavailable. Please try again later.'
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || 'I apologize, I could not process your request.';

    console.log('Chat response generated successfully');

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Chat function error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      error: errorMessage,
      response: 'Sorry, I encountered an error. Please try again.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
