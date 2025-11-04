/**
 * Formata número de telefone de acordo com o código do país
 */
export const formatPhoneByCountry = (value: string, countryCode: string): string => {
  // Remove tudo que não é número
  let digits = value.replace(/\D/g, "");
  
  switch (countryCode) {
    case "+55": // Brasil
      if (digits.length > 11) digits = digits.slice(0, 11);
      if (digits.length <= 2) return `(${digits}`;
      if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
      
    case "+1": // EUA/Canadá
      if (digits.length > 10) digits = digits.slice(0, 10);
      if (digits.length <= 3) return `(${digits}`;
      if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      
    case "+351": // Portugal
    case "+34": // Espanha
      if (digits.length > 9) digits = digits.slice(0, 9);
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
      
    case "+33": // França
      if (digits.length > 10) digits = digits.slice(0, 10);
      if (digits.length <= 2) return digits;
      if (digits.length <= 4) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
      if (digits.length <= 6) return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4)}`;
      if (digits.length <= 8) return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6)}`;
      return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
      
    case "+44": // Reino Unido
    case "+39": // Itália
      if (digits.length > 10) digits = digits.slice(0, 10);
      if (digits.length <= 4) return digits;
      if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
      return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
      
    default:
      // Formato genérico para outros países
      if (digits.length > 15) digits = digits.slice(0, 15);
      return digits;
  }
};

/**
 * Retorna o placeholder apropriado para cada país
 */
export const getPhonePlaceholder = (countryCode: string): string => {
  switch (countryCode) {
    case "+55": return "(11) 91234-5678";
    case "+1": return "(123) 456-7890";
    case "+351": return "912 345 678";
    case "+34": return "612 345 678";
    case "+33": return "06 12 34 56 78";
    case "+44": return "7400 123456";
    case "+39": return "320 123 4567";
    default: return "123456789";
  }
};

/**
 * Valida se o número tem o tamanho mínimo esperado para o país
 */
export const validatePhoneLength = (phone: string, countryCode: string): boolean => {
  const digits = phone.replace(/\D/g, "");
  
  switch (countryCode) {
    case "+55": return digits.length >= 10; // Brasil: 10 ou 11 dígitos
    case "+1": return digits.length === 10; // EUA/Canadá: 10 dígitos
    case "+351":
    case "+34": return digits.length === 9; // Portugal/Espanha: 9 dígitos
    case "+33": return digits.length === 10; // França: 10 dígitos
    case "+44":
    case "+39": return digits.length === 10; // UK/Itália: 10 dígitos
    default: return digits.length >= 8; // Mínimo genérico
  }
};
