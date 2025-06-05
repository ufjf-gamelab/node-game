**Dado Sucesso** é um **nó do tipo modificador** responsável por determinar se os valores de entrada representam um sucesso de acordo com uma condição de corte definida. Ele é comumente usado para avaliar se um lançamento de dado atingiu ou superou um valor mínimo necessário para sucesso em testes ou ações dentro de um jogo.

- **Tipo:** modificador (nó intermediário)
- **Função:** Avalia se um valor é considerado sucesso (>= valor definido)
- **Saída:** `1` para sucesso, `0` para falha

---

## **Propriedades**

### **ID do Nó**

- **Tipo:** Texto
- **Padrão:** ID aleatório
- **Função:** Identificador único do nó

### **Status**

- **Tipo:** Status
- **Padrão:** `IDLE`
- **Função:** Indica o estado atual do nó:
  - `IDLE`: Pronto para uso
  - `LOADING`: Calculando resultados
  - `FINISHED`: Finalizado com sucesso
  - `ERROR`: Ocorreu um problema
  - `MISSING DATA`: Faltando dados de entrada ou propriedades

### **Nome**

- **Tipo:** Texto
- **Padrão:** Dado Sucesso
- **Função:** Nome exibido no quadro de modelagem

### **Sucesso igual ou maior que**

- **Tipo:** Inteiro
- **Padrão:** `6`
- **Função:** Define o valor mínimo para que o resultado seja considerado um sucesso (`valor >= valor de sucesso`)

---

## **Exemplo de Uso**

**Cenário:** Simular um ataque básico em um RPG que usa um dado de 6 faces (1d6) e requer um valor mínimo de 4 para acerto.

### **1. Propriedades do Dado Gerador:**

- Valor Mínimo: `1`
- Valor Máximo: `6`

### **2. Propriedades do Dado Sucesso:**

- Sucesso igual ou maior que: `4`

### **3. Conexão com outros nós:**

- Conecte **Dado Gerador** ao nó **Dado Sucesso**
- Conecte **Dado Sucesso** ao nó **Histograma**

![Dado Gerador → Dado Sucesso → Histograma](/images/generator-success.png)

---

## **Notas**

- O **Dado Sucesso** transforma a entrada numérica em um valor binário de sucesso (`1`) ou falha (`0`) com base na comparação `>=`.
- É uma versão simplificada do nó **Dado Lógico**, focada exclusivamente na condição de "maior ou igual" (≥).
- É ideal para representar regras simples de sucesso, como testes de ataque, testes de perícia ou outras mecânicas que dependem de uma rolagem mínima.
