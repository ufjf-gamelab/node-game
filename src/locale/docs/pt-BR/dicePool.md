**Pool de Dado** é um **nó do tipo modificador** utilizado para gerar uma **pool numérica** a partir de um **nó gerador numérico de entrada**. Ele representa múltiplas rolagens simultâneas do mesmo tipo de dado, sendo ideal para sistemas que exigem agrupamento de valores aleatórios, como jogadas de múltiplos dados.

- **Tipo:** Modificador (nó intermediário)
- **Função:** Executa múltiplas rolagens do nó gerador de entrada com base na quantidade definida
- **Saída:** Pool numérica (lista dos multiplos valores de cada jogada)

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
- **Padrão:** Pool de Dado
- **Função:** Nome exibido no quadro de modelagem

### **Quantidade**

- **Tipo:** Número inteiro
- **Padrão:** `2`
- **Função:** Define quantas vezes o nó gerador será executado por jogada (ex: 3 gera 3dX)

---

## **Exemplo de Uso**

**Cenário:** Simular um sistema de dano onde o jogador rola **2 dados de seis faces (2d6)** e soma o resultado para determinar o dano total.

### **1. Propriedades do nó Gerador de Dado:**

- Valor Mínimo: `1`
- Valor Máximo: `6`

### **2. Propriedades do nó Pool de Dado:**

- Quantidade: `2`

### **3. Conexões:**

- Conecte o **Gerador de Dado** ao nó **Pool de Dado**
- Conecte o **Pool de Dado** ao nó **Pool Soma de Dado**
- Conecte o **Pool Soma de Dado** ao nó **Histograma**

<img src="/node-crafter/doc-images/select-random.png" width="500px" alt="Exemplo de uso do Pool de Dado com Pool Soma de Dado"/>

---

## **Notas**

- Ideal para representar rolagens como **2d6**, **3d10**, etc., centralizando a lógica de repetição em um único nó.
- Pode ser combinado com nós de seleção como **Selecionar Maior Dado** e **Selecionar Dado Aleatório** para operar um filtro da pool.
- Substitui a necessidade de múltiplos nós geradores distintos para simular mais de um dado.
