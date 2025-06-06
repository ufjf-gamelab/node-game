**Success Dice** is a **modifier-type node** responsible for determining whether input values represent a success according to a defined threshold condition. It is commonly used to evaluate whether a dice roll meets or exceeds the minimum value required to succeed in tests or actions within a game.

- **Type:** Modifier (intermediate node)
- **Function:** Evaluates whether a value is considered a success (`>=` defined value)
- **Output:** `1` for success, `0` for failure

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
- **Default:** Success Dice
- **Function:** Name displayed in the modeling canvas

### **Success equal or greater than**

- **Type:** Integer
- **Default:** `6`
- **Function:** Sets the minimum value required for the result to be considered a success (`value >= success threshold`)

---

## **Usage Example**

**Scenario:** Simulate a basic attack in an RPG using a six-sided die (1d6) where a minimum roll of 4 is required for a hit.

### **1. Dice Generator Properties:**

- Minimum Value: `1`
- Maximum Value: `6`

### **2. Success Dice Properties:**

- Success equal or greater than: `4`

### **3. Node Connection:**

- Connect **Dice Generator** to **Success Dice**
- Connect **Success Dice** to **Histogram**

![Dice Generator → Success Dice → Histogram](/images/generator-success.png)

---

## **Notes**

- **Success Dice** converts a numeric input into a binary output: success (`1`) or failure (`0`) based on the `>=` comparison.
- It is a **simplified version** of the **Logic Dice** node, focused solely on the **"greater than or equal to" (≥)** condition.
- Ideal for modeling simple success rules, such as attack rolls, skill checks, or any mechanics requiring a minimum dice result.
- Can be combined with multiple dice and other processing nodes to build more complex rule systems.
