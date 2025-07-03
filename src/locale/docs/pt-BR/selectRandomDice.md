**Selecionar Dado Aleatório** é um **nó do tipo modificador** utilizado para transformar uma **pool numérica** em uma **lista simples contendo apenas um valor por jogada**, selecionado de forma aleatória. Sua principal função é filtrar os múltiplos valores contidos em uma pool para um único valor representativo por jogada, mantendo o fator aleatório.

- **Tipo:** Modificador (nó intermediário)
- **Função:** Seleciona aleatoriamente um valor por jogada dentro de uma pool numérica
- **Saída:** Lista simples de valores numéricos

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
- **Padrão:** Selecionar Dado Aleatório
- **Função:** Nome exibido no quadro de modelagem

---

## **Exemplo de Uso**

**Cenário:** Em um jogada de ataque 3 personagens rolam um dado de 6 faces (3d6) para determinar o dano, mas apenas um valor aleatório entre os três será usado como dano final por jogada.

### **1. Propriedades do nó Gerador de Dado:**

- Valor Mínimo: `1`
- Valor Máximo: `6`

### **2. Propriedades do nó Pool de Dado:**

- Quantidade: `3`

### **3. Conexões:**

- Conecte o **Gerador de Dado** ao nó **Pool de Dados**
- Conecte o **Pool de Dados** ao nó **Selecionar Dado Aleatório**
- Conecte o **Selecionar Dado Aleatório** ao nó **Histograma**
- %BASE_URL%

<img src="/node-crafter/doc-images/select-random.png" alt="Exemplo de uso do nó Selecionar Dado Aleatório" width="500px"/>

---

## **Notas**

- Ideal para situações onde o jogador rola múltiplos dados em uma **pool**, mas apenas **um resultado deve ser escolhido**.
- Pode ser usado para representar efeitos como "selecionar um dado da mão" ou qualquer outra decisão aleatória entre elementos disponíveis.
- Funciona apenas com entradas do tipo **pool numérica**.
- É uma forma de transformar uma pool numérica em uma lista simples para utilizar nós que **não suportam entradas do tipo pool.**
