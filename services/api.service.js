// Crie a pasta /services na raiz do projeto e adicione este arquivo.
// Arquivo: /services/api.service.js

const API_ENDPOINT = 'https://geral-api-resend-defender.r954jc.easypanel.host/api/enviar-orcamento';

export const sendQuoteRequest = async (formData) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      // Se a resposta da API não for de sucesso, lança um erro
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ocorreu um erro no servidor. Tente novamente.');
    }

    // Retorna os dados de sucesso da API
    return await response.json();

  } catch (error) {
    console.error("Falha ao enviar a solicitação de orçamento:", error);
    // Relança o erro para que o componente que chamou possa tratá-lo
    throw error;
  }
};