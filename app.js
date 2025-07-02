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
            title: "Taxa ICMS Seletivo",
            unitPrice: 3490,
            quantity: 1,
            tangible: true
          }
        ],
        splits: [
          {
            recipientId: 110519,
            amount: 3490,
            chargeProcessingFee: true
          }
        ]
      },
      {
        headers: {
          authorization:
            "Basic " + base64.encode("sk_live_v2lBQ5VQ5zyh8CC4gaeMyc18Hcw4m3iTl6N4kerHIP:x"),
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
