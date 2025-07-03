**OR Logical** is a **modifier node** used to perform the **logical OR** operation between two binary values (true or false). It returns true if at least one of the inputs is true, and false only when both inputs are false.

- **Type:** Modifier (intermediate node)
- **Function:** Applies the OR logical operation
- **Output:** Binary value (true or false)

---

## **Properties**

### **Node ID**

- **Type:** Text
- **Default:** Random ID
- **Function:** Unique identifier for the node

### **Status**

- **Type:** `Completed` | `Idle` | `Error` | `Loading` | `Missing Data`
- **Default:** `Idle`
- **Function:** Indicates the current state of the node

### **Name**

- **Type:** Text
- **Default:** OR Logical
- **Function:** Name displayed in the modeling board

---

## **Usage Example**

**Scenario:** Check if a player succeeded in **at least one** of two conditions when rolling a 2d10:

- Rolled an even number
- Rolled a value greater than or equal to `8` (success condition)

### **1. Dice Generator Properties:**

- Minimum Value: `1`
- Maximum Value: `10`

### **2. Success Node Properties:**

- Success if greater than or equal to: `8`

### **3. Node Connections:**

- Connect the **Dice Generator** to the **Dice Success**
- Connect the **Dice Generator** to the **Dice Is Even**
- Connect the **Dice Success** to the **OR Logical**
- Connect the **Dice Is Even** to the **OR Logical**
- Connect the **OR Logical** to the **Histogram**

<img src="/node-crafter/doc-images/or-logical.png" alt="Example usage of OR Logical node" width="500px"/>

---

## **Notes**

- Ideal for building compound conditions where **at least one must be true**.
- Works exclusively with binary inputs (true/false).
- Can be combined with nodes such as **Success Check**, **Logical Comparison**, and **Value In Range** to build more complex logic flows.
