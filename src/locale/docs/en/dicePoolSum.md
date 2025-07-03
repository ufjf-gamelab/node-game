**Dice Pool Sum** is a **modifier-type node** responsible for summing the grouped values from a **Dice Pool** node. It is used to calculate the total from a combination of grouped values, such as summing multiple dice rolls in game systems.

- **Type:** Modifier (intermediate node)
- **Function:** Sums the grouped values from each execution of the Dice Pool
- **Output:** List with the summed totals per execution

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
- **Default:** Dice Pool Sum
- **Function:** Name displayed on the modeling board

---

## **Usage Example**

**Scenario:** Simulate a damage system where the player rolls two six-sided dice (2d6) and sums the result to determine total damage.

### **1. Dice Generator Properties:**

- Dice A: Minimum Value `1`, Maximum Value `6`
- Dice B: Minimum Value `1`, Maximum Value `6`

### **2. Connection with other nodes:**

- Connect **Dice A** to **Dice Pool**
- Connect **Dice B** to **Dice Pool**
- Connect **Dice Pool** to **Dice Pool Sum**
- Connect **Dice Pool Sum** to **Histogram**

<img src="/node-crafter/doc-images/dice-pool.png" width="500px" alt="Example usage of Dice Pool with Dice Pool Sum"/>

---

## **Notes**

- Must always receive input from a **Dice Pool** node
- Ideal for representing systems involving the sum of multiple dice
