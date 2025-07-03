**Symbolic Generator** is a **generator-type node** used to create random symbolic values based on a set of **user-defined faces**. Unlike the **Dice Generator**, which operates with numbers, this node works with **textual values**, making it useful for representing elements such as cards, items, symbols, or any other kind of non-numerical result.

- **Type:** Generator (initial node)
- **Function:** Randomly generates one of the defined symbolic values
- **Output:** One symbolic value per execution
- **Output:** List of random values chosen from the defined faces

---

## **Properties**

### **Node ID**

- **Type:** Text
- **Default:** Random ID
- **Function:** Unique identifier for the node

### **Status**

- **Type:** `Finished` | `Idle` | `Error` | `Loading` | `Missing data`
- **Default:** `Idle`
- **Function:** Indicates the current state of the node

### **Name**

- **Type:** Text
- **Default:** Generator
- **Function:** Name displayed on the modeling canvas

### **Faces**

- **Type:** Text
- **Default:** `A, B`
- **Function:** Defines the possible symbolic values to be drawn
- **Note:** At least one face is required.

---

## **Usage Example**

**Scenario:** Simulate the drawing of a card from three possible options: `"Heart"`, `"Sword"`, or `"Star"`.

### **1. Symbolic Generator Properties:**

- Faces: `Heart`, `Sword`, `Star`

### **2. Connection with Other Nodes:**

- Connect the **Symbolic Generator** directly to a **Histogram** node or any other node compatible with symbolic values.

<img src="/node-crafter/doc-images/symbolic.png" width="500px" alt="Example usage of the Symbolic Generator node"/>

---

## **Notes**

- Ideal for representing symbolic draws such as cards, tokens, or elements from abstract games.
- Not compatible with nodes that require numerical values, such as mathematical, logical, or comparison operators.
