**Gerador de Dado** é um **nó do tipo gerador** responsável por simular lançamentos de dados dentro de um intervalo definido. Ele é o **ponto de partida** para qualquer simulação que envolva aleatoriedade com dados, como sistemas de ataque, testes de habilidade ou qualquer mecânica que dependa de lançamentos de dados.

- **Tipo:** Gerador (nó inicial, não depende de outros nós).
- **Função:** Produz valores inteiros aleatórios dentro de um intervalo configurável.
- **Saída:** Números inteiros entre os valores mínimo e máximo definidos.

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
- **Padrão:** Histograma
- **Função:** Nome exibido no quadro de modelagem e no gráfico gerado

### **Valor Mínimo**

- **Tipo:** Inteiro.
- **Padrão:** `1`.
- **Função:** Define o menor valor possível que o dado pode gerar.

### **Valor Máximo**

- **Tipo:** Inteiro (deve ser > valor mínimo).
- **Padrão:** `6`.
- **Função:** Define o maior valor possível que o dado pode gerar.

---

## **Exemplo de Uso**

**Cenário:** Simular um ataque básico em um RPG que usa um dado de 6 faces (1d6) e requer um valor mínimo de 4 para acerto.

### **1. Propriedades do Gerador de Dado:**

- Valor Mínimo: `1`
- Valor Máximo: `6`

### **2. Propriedades do Dado Sucesso:**

- Sucesso igual ou maior que: `4`

### **3. Conexão com outros nós:**

- Conecte **Gerador de Dado** ao nó **Dado Sucesso**
- Conecte **Dado Sucesso** ao nó **Histograma**

<img src="/images/generator-success.png" width="500px" alt="Exemplo de uso do Gerador de Dado"/>

---

## **Notas**

- O **Gerador de Dado** é sempre o **primeiro nó** em uma cadeia de simulação com dados.
- Ele **não possui entrada**—apenas saída—pois gera valores aleatórios de forma independente.
- Pode ser usado sozinho para testes rápidos ou combinado com modificadores para regras mais complexas.
