**Select Random Dice** is a **modifier-type node** used to transform a **numeric pool** into a **simple list containing only one value per simulation**, selected randomly. Its main function is to filter the multiple values in a pool down to a single representative value per simulation, while preserving randomness.

- **Type:** Modifier (intermediate node)
- **Function:** Randomly selects one value per simulation from a numeric pool
- **Output:** Simple list of numeric values

---

## **Properties**

### **Node ID**

- **Type:** Text
- **Default:** Random ID
- **Function:** Unique identifier for the node

### **Status**

- **Type:** `Finished` | `Idle` | `Error` | `Loading` | `Missing Data`
- **Default:** `Idle`
- **Function:** Indicates the current state of the node

### **Name**

- **Type:** Text
- **Default:** Select Random Dice
- **Function:** Name displayed in the modeling board

---

## **Usage Example**

**Scenario:** In an attack roll, 3 characters each roll a 6-sided dice (3d6) to determine the damage, but only one random value among the three is used as the final damage per simulation.

### **1. Dice Generator Node Properties:**

- Minimum Value: `1`
- Maximum Value: `6`

### **2. Dice Pool Node Properties:**

- Quantity: `3`

### **3. Connections:**

- Connect the **Dice Generator** to the **Dice Pool** node
- Connect the **Dice Pool** node to the **Select Random Dice** node
- Connect the **Select Random Dice** node to the **Histogram** node

<img src="/node-crafter/doc-images/select-random.png" alt="Example usage of Select Random Dice node" width="500px"/>

---

## **Notes**

- Ideal for situations where the player rolls multiple dice in a **pool**, but only **one result should be chosen**.
- Can be used to represent effects like "selecting a dice from hand" or any other random choice among available elements.
- Only works with inputs of type **numeric pool**.
- It's a way to convert a numeric pool into a simple list to be used with nodes that **do not support pool-type inputs**.
