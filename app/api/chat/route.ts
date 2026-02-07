import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Simulated AI responses with various capabilities
const generateResponse = (messages: Message[]): string => {
  const lastMessage = messages[messages.length - 1].content.toLowerCase();

  // Code generation
  if (lastMessage.includes('code') || lastMessage.includes('function') || lastMessage.includes('program')) {
    if (lastMessage.includes('python')) {
      return `Here's a Python example:

\`\`\`python
def fibonacci(n):
    """Generate Fibonacci sequence up to n terms."""
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

# Example usage
print(fibonacci(10))
\`\`\`

This function generates the first n numbers in the Fibonacci sequence. Would you like me to explain how it works or modify it?`;
    } else if (lastMessage.includes('javascript') || lastMessage.includes('react')) {
      return `Here's a React component example:

\`\`\`javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}

export default Counter;
\`\`\`

This creates a simple counter component with increment and decrement buttons. Need any modifications?`;
    }
    return `I'd be happy to help you with code! I can generate code in various languages including Python, JavaScript, TypeScript, Java, C++, and more. What specific programming task would you like help with?`;
  }

  // Math/calculations
  if (lastMessage.match(/\d+\s*[\+\-\*\/]\s*\d+/) || lastMessage.includes('calculate') || lastMessage.includes('solve')) {
    return `I can help you with calculations and math problems! Here are some examples:

**Basic Arithmetic:**
- Addition: 25 + 37 = 62
- Multiplication: 12 × 8 = 96

**Algebra:**
If you need to solve equations like "2x + 5 = 15":
- Subtract 5: 2x = 10
- Divide by 2: x = 5

**Statistics:**
Mean, median, mode calculations, standard deviation, etc.

What specific calculation would you like me to help with?`;
  }

  // Writing/content creation
  if (lastMessage.includes('write') || lastMessage.includes('essay') || lastMessage.includes('article') || lastMessage.includes('email')) {
    return `I can help you with various writing tasks:

**Professional Email:**
"Dear [Recipient],

I hope this message finds you well. I'm reaching out to discuss [topic]. Based on our previous conversation, I believe [key point].

Would you be available for a brief call this week to explore this further?

Best regards,
[Your name]"

**Blog Post Structure:**
1. Compelling headline
2. Introduction hook
3. Main content with subheadings
4. Supporting examples
5. Conclusion with call-to-action

What type of content would you like me to help create?`;
  }

  // Explanations
  if (lastMessage.includes('explain') || lastMessage.includes('what is') || lastMessage.includes('how does')) {
    return `I can explain complex concepts in simple terms! For example:

**Artificial Intelligence:** AI systems learn patterns from data to make decisions, similar to how humans learn from experience.

**Blockchain:** A distributed digital ledger that records transactions across many computers, making it nearly impossible to alter records retroactively.

**Quantum Computing:** Uses quantum mechanics principles to process information in ways that could solve certain problems much faster than classical computers.

What would you like me to explain in detail?`;
  }

  // Lists/recommendations
  if (lastMessage.includes('list') || lastMessage.includes('recommend') || lastMessage.includes('suggest')) {
    return `I can provide lists and recommendations! Here's an example:

**Top Productivity Tips:**
1. **Time Blocking** - Schedule specific tasks for specific time slots
2. **Pomodoro Technique** - Work in 25-minute focused intervals
3. **Priority Matrix** - Categorize tasks by urgency and importance
4. **Digital Detox** - Minimize distractions by turning off notifications
5. **Morning Routine** - Start your day with consistent, energizing habits

What type of list or recommendations are you looking for?`;
  }

  // Data analysis
  if (lastMessage.includes('analyze') || lastMessage.includes('data') || lastMessage.includes('compare')) {
    return `I can help analyze data and provide insights:

**Comparison Analysis:**
| Feature | Option A | Option B |
|---------|----------|----------|
| Cost | $50/mo | $75/mo |
| Users | 10 | Unlimited |
| Storage | 100GB | 500GB |
| Support | Email | 24/7 Phone |

**Key Insights:**
- Option B offers better value for teams
- Option A is ideal for small projects
- Consider growth trajectory when choosing

What would you like me to analyze?`;
  }

  // Translation
  if (lastMessage.includes('translate')) {
    return `I can help with translations! Here are some examples:

**English to Spanish:**
- "Hello, how are you?" → "Hola, ¿cómo estás?"
- "Thank you very much" → "Muchas gracias"

**English to French:**
- "Good morning" → "Bonjour"
- "See you later" → "À bientôt"

I can translate between many languages. What would you like translated?`;
  }

  // Debug/troubleshoot
  if (lastMessage.includes('error') || lastMessage.includes('bug') || lastMessage.includes('fix') || lastMessage.includes('debug')) {
    return `I can help debug issues! Here's a common debugging approach:

**Common Error Types:**

1. **Syntax Errors**
   - Missing brackets, semicolons, or quotes
   - Solution: Check matching pairs and statement endings

2. **Runtime Errors**
   - Null reference, undefined variables
   - Solution: Verify variable initialization and null checks

3. **Logic Errors**
   - Code runs but produces wrong output
   - Solution: Add console.log() statements to trace execution

**Debugging Tips:**
- Read error messages carefully
- Isolate the problem area
- Test with simple inputs first
- Use debugging tools (breakpoints, console)

What specific error are you encountering?`;
  }

  // Brainstorming
  if (lastMessage.includes('idea') || lastMessage.includes('brainstorm') || lastMessage.includes('creative')) {
    return `I can help brainstorm ideas! Here's an example:

**App Ideas for 2024:**

1. **EcoTrack** - Personal carbon footprint tracker with gamification
2. **MealPrep AI** - Smart meal planning based on dietary needs and budget
3. **LocalConnect** - Hyperlocal community networking platform
4. **SkillSwap** - Peer-to-peer skill exchange marketplace
5. **MindfulMinutes** - Quick guided meditation for busy professionals

**Brainstorming Techniques:**
- Mind mapping
- SCAMPER method (Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, Reverse)
- "What if?" scenarios
- Reverse thinking

What area would you like to brainstorm about?`;
  }

  // Summary/TLDR
  if (lastMessage.includes('summary') || lastMessage.includes('summarize') || lastMessage.includes('tldr')) {
    return `I can create concise summaries of long content! Here's an example format:

**TL;DR:**
Main point summarized in 1-2 sentences.

**Key Takeaways:**
- Point 1: Brief explanation
- Point 2: Brief explanation
- Point 3: Brief explanation

**Conclusion:**
Final thought or action item.

What would you like me to summarize?`;
  }

  // Planning/strategy
  if (lastMessage.includes('plan') || lastMessage.includes('strategy') || lastMessage.includes('roadmap')) {
    return `I can help create plans and strategies! Example:

**Product Launch Roadmap:**

**Phase 1: Research (Weeks 1-2)**
- Market analysis
- Competitor research
- User surveys

**Phase 2: Development (Weeks 3-8)**
- MVP features
- Testing cycles
- Feedback integration

**Phase 3: Launch (Weeks 9-10)**
- Marketing campaign
- Press releases
- Early access program

**Phase 4: Growth (Weeks 11+)**
- User acquisition
- Feature expansion
- Optimization

What type of plan do you need help creating?`;
  }

  // Greeting responses
  if (lastMessage.match(/^(hi|hello|hey|greetings)/)) {
    return `Hello! Great to chat with you. I'm Chatify, and I can help you with:

- 💻 **Code generation** in any programming language
- 📝 **Writing** emails, articles, essays, and content
- 🔍 **Research** and explanations on any topic
- 🧮 **Math** and calculations
- 🐛 **Debugging** and troubleshooting
- 💡 **Brainstorming** ideas and solutions
- 📊 **Data analysis** and comparisons
- 🗺️ **Planning** and strategy development
- And much more!

What can I help you with today?`;
  }

  // Gratitude
  if (lastMessage.match(/thank|thanks|appreciate/)) {
    return `You're very welcome! I'm happy to help. If you need anything else, just ask!`;
  }

  // Goodbye
  if (lastMessage.match(/bye|goodbye|see you|farewell/)) {
    return `Goodbye! Feel free to return anytime you need assistance. Have a great day!`;
  }

  // Default intelligent response
  return `I understand you're asking about "${messages[messages.length - 1].content}".

I can help you with that! As an AI assistant, I have a wide range of capabilities:

**I can assist with:**
- Answering questions and providing explanations
- Generating and debugging code
- Writing and editing content
- Solving problems and calculations
- Analyzing data and providing insights
- Brainstorming ideas
- Creating plans and strategies
- Translation and language help

Could you provide more details about what you'd like to know or accomplish? The more specific you are, the better I can assist you!`;
};

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // Generate AI response
    const responseMessage = generateResponse(messages);

    return NextResponse.json({ message: responseMessage });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
