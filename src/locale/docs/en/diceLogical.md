**Dice Logical Comparison** is a **modifier-type node** used to perform logical comparisons between two sets of numerical data. Available operations include equality, greater than or equal to, and less than or equal to. This node returns `1` when the condition is true and `0` when false, allowing the construction of rules and conditions in simulation systems.

- **Type:** Modifier (intermediate node)
- **Function:** Compares two input values based on a logical operation
- **Output:** `1` for true, `0` for false

---

## **Properties**

### **Node ID**

- **Type:** Text
- **Default:** Random ID
- **Function:** Unique identifier of the node

### **Status**

- **Type:** `Finished` | `Idle` | `Error` | `Loading` | `Missing Data`
- **Default:** `Idle`
- **Function:** Indicates the current state of the node

### **Name**

- **Type:** Text
- **Default:** Dice Logical Comparison
- **Function:** Name displayed on the modeling board

### **Operation**

- **Type:** `A = B` | `A >= B` | `A <= B`
- **Default:** `A = B`
- **Function:** Defines the logical operation applied between the two input values

---

## **Example of Use**

**Scenario:** Simulate whether a player's attack (rolling 1d20) succeeds by comparing it with an enemy's defense (rolling 1d12). The attack is successful if the attack value is **greater than or equal to** the defense.

### **1. Properties of the Data Generator Nodes:**

- Attack Dice Generator: Minimum Value `1`, Maximum Value `20`
- Defense Dice Generator: Minimum Value `1`, Maximum Value `12`

### **2. Properties of the Dice Logical Comparison Node:**

- Operation: `A >= B`

### **3. Connections with other nodes:**

- Connect **Attack Dice Generator** to the **Dice Logical Comparison** node
- Connect **Defense Dice Generator** to the **Dice Logical Comparison** node
- Connect the **Dice Logical Comparison** node to the **Histogram** node

<img src="/node-crafter/doc-images/logical.png" width="500px" alt="Example of use of the Dice Logical Comparison node"/>

---

## **Notes**

- Ideal for checking conditions between roll results, such as hits, misses, successes, or tests.
- Useful for representing saving throws, attribute confrontations, or difficulty checks.
