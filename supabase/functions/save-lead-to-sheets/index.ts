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
    const { nome, email, telefone } = await req.json();
    
    if (!nome || !email || !telefone) {
      return new Response(
        JSON.stringify({ error: 'Todos os campos são obrigatórios' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('GOOGLE_SHEETS_API_KEY');
    const sheetsId = Deno.env.get('GOOGLE_SHEETS_ID');
    
    if (!apiKey || !sheetsId) {
      console.error('Missing Google Sheets credentials');
      return new Response(
        JSON.stringify({ error: 'Configuração do Google Sheets não encontrada' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Data to append to the sheet
    const timestamp = new Date().toLocaleString('pt-BR');
    const values = [[timestamp, nome, email, telefone]];

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetsId}/values/A:D:append`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: values,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS'
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Sheets API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Erro ao salvar no Google Sheets' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = await response.json();
    console.log('Lead salvo com sucesso:', result);

    return new Response(
      JSON.stringify({ success: true, message: 'Lead salvo com sucesso!' }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erro na função save-lead-to-sheets:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});