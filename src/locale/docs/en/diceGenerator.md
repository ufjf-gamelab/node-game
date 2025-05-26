O **Dice Generator** é um nó do tipo **gerador**, responsável por simular rolagens de dados dentro de um intervalo definido. É o **ponto de partida** para qualquer simulação que envolva aleatoriedade com uso de dados, como sistemas de ataque, testes de habilidade ou qualquer mecânica que dependa de rolagens de dados.

- **Tipo:** Gerador (nó inicial, não depende de outros nós).
- **Função:** Produz valores inteiros aleatórios dentro de um intervalo configurável.
- **Saída:** Números inteiros entre o valor mínimo e máximo definidos.

---

## **Propriedades**

1. **Valor Mínimo**

   - **Tipo:** Inteiro.
   - **Padrão:** 1.
   - **Função:** Define o menor valor possível que o dado pode gerar.

2. **Valor Máximo**
   - **Tipo:** Inteiro (> valor mínimo).
   - **Padrão:** 6.
   - **Função:** Define o maior valor possível que o dado pode gerar.

---

## **Exemplo de Uso**

**Cenário:** Simular um ataque básico em um RPG que usa um dado de 20 faces (1d20) e requer o valor minimo de acerto de 12.

</br>

1. **Configuração do Dice Generator:**

   - **Valor Mínimo:** `1`.
   - **Valor Máximo:** `20`.

2. **Conexão com outros nós:**

   - Deve ser conectado a um **Dice Success** configurado para verificar que o ataque acerta com valores ≥ 12.
   - E por fim, **Dice Success** deve ser ligado a um **Histogram** para visualizar a distribuição dos resultados das simulações.

<img
src="/images/generator-success.png" width="500px" style="margin: 0 auto"/>

<!-- ![Exemplo de conexão dos nós](/images/generator-success.png) -->

---

## **Observações**

- O **Dice Generator** é sempre o **primeiro nó** em uma cadeia de simulação.
- Ele **não possui entrada**, apenas saída, pois gera valores aleatórios sem depender de outros nós.
- Pode ser usado sozinho para testes rápidos ou combinado com modificadores para regras mais complexas.
