**Gerador Simbólico** é um **nó do tipo gerador** utilizado para criar valores simbólicos aleatórios com base em um conjunto de **faces definidas pelo usuário**. Ao contrário do **Gerador de Dado**, que trabalha com números, este nó opera com **valores textuais**, sendo útil para representar elementos como cartas, itens, símbolos ou qualquer outro tipo de resultado não numérico.

- **Tipo:** Gerador (nó inicial)
- **Função:** Gera aleatoriamente um dos valores simbólicos definidos
- **Saída:** Um valor simbólico por execução
- **Saída:** Lista de valores aleatórios dentro das faces definidas

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
- **Padrão:** Simbólico
- **Função:** Nome exibido no quadro de modelagem

### **Faces**

- **Tipo:** Texto
- **Padrão:** `A, B`
- **Função:** Define os valores simbólicos possíveis a serem sorteados
- **Observação:** Pelo menos uma face é obrigatória.

---

## **Exemplo de Uso**

**Cenário:** Simular o sorteio de uma carta entre três opções possíveis: "Coração", "Espada" ou "Estrela".

### **1. Propriedades do Gerador Simbólico:**

- Faces: `Coração`, `Espada`, `Estrela`

### **2. Conexão com outros nós:**

- Conecte o **Gerador Simbólico** diretamente ao nó **Histograma** ou outro nó compatível com valores simbólicos

<img src="/images/symbolic.png" width="500px" alt="Exemplo de uso do Gerador Simbólico"/>

---

## **Notas**

- Ideal para representar sorteios simbólicos como cartas, peças, ou elementos de jogos abstratos.
- Não é compatível com nós que exigem valores numéricos, como operadores matemáticos, lógicos ou comparação de valores.
