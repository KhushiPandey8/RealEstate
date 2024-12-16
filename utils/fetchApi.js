import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
        'x-rapidapi-key': '7396ceab29mshc6922d9b8f31190p1cf0a7jsn1130d3090d62',
        'x-rapidapi-host': 'bayut.p.rapidapi.com'
      }
  });
    
  return data;
}