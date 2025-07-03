**Dado é Ímpar** é um **nó do tipo modificador** que retorna um resultado binário indicando sucesso ou falha com base na verificação se o valor numérico de entrada é ímpar.

- **Tipo:** Modificador (nó intermediário)
- **Função:** Verifica se o valor de entrada é ímpar
- **Saída:** Verdadeiro (sucesso) se é ímpar, falso (falha) se não é ímpar

---

## **Propriedades**

### **ID do Nó**

- **Tipo:** Texto
- **Padrão:** ID aleatório
- **Função:** Identificador único do nó

### **Status**

- **Tipo:** `Finalizado` | `Ocioso` | `Erro` | `Carregando` | `Faltando dados`
- **Padrão:** `Ocioso`
- **Função:** Indica o estado atual do nó

### **Nome**

- **Tipo:** Texto
- **Padrão:** É ímpar
- **Função:** Nome exibido no quadro de modelagem

---

## **Exemplo de Uso**

**Cenário:** Simular uma verificação de sucesso em que o jogador obtém sucesso se o valor rolado em um **1d10** for ímpar.

### **1. Propriedades do nó Gerador de Dados:**

- Gerador de Dado: Valor Mínimo `1`, Valor Máximo `10`

### **2. Conexão com outros nós:**

- Conecte o nó **Gerador de Dado** ao nó **Dado é Ímpar**
- Conecte o nó **Dado é Ímpar** ao nó **Histograma de Sucesso/Falha**

<img src="/node-crafter/doc-images/is-odd.png" width="500px" alt="Exemplo de uso do nó Dado é Ímpar"/>

---

## **Notas**

- Útil para mecânicas de resultado binário baseadas na paridade (ímpar/par) de rolagens de dados.
