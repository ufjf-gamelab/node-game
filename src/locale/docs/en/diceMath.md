**Math** is a **modifier-type node** used to perform mathematical operations between two sets of numerical data. The available operations include addition, subtraction, multiplication, and divisions with either floor (rounding down) or ceiling (rounding up). It is useful for representing modifiers, bonuses, penalties, or calculations between different game results.

- **Type:** Modifier (intermediate node)
- **Function:** Applies a mathematical operation between two input values
- **Output:** Result of the mathematical operation for each execution

---

## **Properties**

### **Node ID**

- **Type:** Text
- **Default:** Random ID
- **Function:** Unique identifier of the node

### **Status**

- **Type:** `Completed` | `Idle` | `Error` | `Loading` | `Missing data`
- **Default:** `Idle`
- **Function:** Indicates the current state of the node

### **Name**

- **Type:** Text
- **Default:** Math
- **Function:** Name displayed in the modeling canvas

### **Operation**

- **Type:** `Addition` | `Subtraction` | `Multiplication` | `Division (floor)` | `Division (ceiling)`
- **Default:** `Addition`
- **Function:** Defines the mathematical operation applied between the two input values

---

## **Example of Use**

**Scenario:** Simulate the final damage dealt by a player who rolls **1d6** base damage, plus a 1d3 strength bonus.

### **1. Data Generator Nodes Properties:**

- Base Damage Dice Generator: Minimum Value `1`, Maximum Value `6`
- Strength Bonus Dice Generator: Minimum Value `1`, Maximum Value `3`

### **2. Math Node Properties:**

- Operation: `Addition`

### **3. Connecting with Other Nodes:**

- Connect **Base Damage Generator** to the **Math** node
- Connect **Strength Bonus Generator** to the **Math** node
- Connect the **Math** node to the **Histogram** node

<img src="/node-crafter/doc-images/math.png" width="500px" alt="Example usage of the Math node"/>

---

## **Notes**

- Ideal for representing modifiers applied to roll results or calculations between different sources.
- The **Division (floor)** operator performs a standard division rounded down.
- The **Division (ceiling)** operator rounds the result up.
