import express from "express";
import axios from "axios";
import cors from "cors";
import base64 from "base-64";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/create-pix", async (req, res) => {
  try {
    console.log("🔄 Criando PIX...");

    const response = await axios.post(
      "https://api.assetpagamentos.com.br/v1/transactions",
      {
        amount: 3490, // R$34,90 em centavos
        paymentMethod: "pix",
        customer: {
          name: "Cliente",
          email: "cliente@email.com",
          document: {
            number: "74042785891",
            type: "cpf"
          }
        },
        items: [
          {
            title: "PAG - TX",
            unitPrice: 3490,
            quantity: 1,
            tangible: true
          }
        ]
        // 👇 REMOVIDO: splits
      },
      {
        headers: {
          authorization:
            "Basic " + base64.encode("sk_live_v22c3n1VVX2Hf02zMbyvaz1nPPKFmPoh7LCAIt2BbM:x"),
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ PIX criado com sucesso:", response.data);
    return res.json(response.data);
  } catch (err) {
    console.error("❌ Erro ao criar PIX:", err.response?.data || err.message);
    return res.status(400).json(err.response?.data || { message: "Erro desconhecido" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
