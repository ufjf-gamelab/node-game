**AND Logical** is a **modifier node** used to perform the **logical AND** operation between two binary values (true or false). It returns true **only when both** inputs are true; otherwise, it returns false.

- **Type:** Modifier (intermediate node)
- **Function:** Applies the logical AND operation
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
- **Default:** AND Logical
- **Function:** Name displayed in the modeling board

---

## **Usage Example**

**Scenario:** Check whether a player achieved **total success** by fulfilling two conditions simultaneously when rolling **1d10**:

- The rolled value is even
- The rolled value is greater than or equal to `8`

### **1. Dice Generator Properties:**

- Minimum Value: `1`
- Maximum Value: `10`

### **2. Success Node Properties:**

- Success if greater than or equal to: `8`

### **3. Node Connections:**

- Connect the **Dice Generator** to the **Dice Success**
- Connect the **Dice Generator** to the **Dice Is Even**
- Connect the **Dice Success** to the **AND Logical**
- Connect the **Dice Is Even** to the **AND Logical**
- Connect the **AND Logical** to the **Histogram**

<img src="/node-crafter/doc-images/and-logical.png" alt="Example usage of AND Logical node" width="500px"/>

---

## **Notes**

- Ideal for building compound conditions where **both conditions must be true**.
- Works exclusively with binary inputs (true/false).
- Can be combined with nodes like **Success Check**, **Logical Comparison**, **Is Even**, among others.
