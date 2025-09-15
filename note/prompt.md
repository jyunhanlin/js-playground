# Prompt for developers

## Basic optimization

### Clear Role Definition

```
You are a senior full-stack engineer.
Please design a JWT-based user login system, including frontend form validation, backend API interface, and database design.
Tech stack: React + Node.js + Golang + MySQL.
```

### Structured Output

```
Please explain microservices architecture with the following structure:
1. Core concept (2-3 sentences)
2. Comparison with monolithic architecture (table)
3. Usage scenarios (3 concrete examples)
4. Recommended tech stack (with categories)
5. Implementation steps (ordered list)"
```

### Provide Context

```
Project:
- Content listing page showing 200 records.
- Current load time: 2s.
- Goal: under 1s
- Main users on mobile.

Tech: React + Next.js + MySQL.
Main issue: slow initial render, image loading lag.

Please provide concrete optimization plans and code samples.
```

## Intermediate Techniques

### Chain of Thought (Step-by-step Reasoning)

```
Task: Design a real-time chat system.

Please follow these steps:
1. Analyze requirements (user volume, message types, real-time needs)
2. Select technology (WebSocket vs SSE vs polling)
3. Design data structures (user, room, message)
4. Provide key code

**Explain your thinking at each step.**
```

### Few-Shot Learning (Example-based Prompts)

```
I need API docs in the following format:

Example 1:
POST /api/users

- Description: Create new user
- Params: { name: string, email: string }
- Response: { id: number, name: string, email: string, createdAt: string }
- Errors: 400 (param error), 409 (email exists)

Example 2:
GET /api/users/:id

- Description: Get user info
- Params: id (in path)
- Response: { id: number, name: string, email: string }
- Errors: 404 (not found)

Now, please document:
- User login API
- Get user list API
- Update user info API
```

### Set Constraints

```
Design a user management database schema with these constraints:

- Must support role/permission management
- Must support user groups and departments
- Must record user activity logs
- Must allow multiple login types (email, phone, 3rd-party)
- Use PostgreSQL
- Output: SQL CREATE TABLE statements
- Required indexes & foreign keys
- Each table max 12 columns
- Consider data security & privacy"
```

### Hypothesis Testing

```
Our React app’s initial load exceeds 3 seconds. Please:

1. List 5 most likely causes
2. Suggest verification methods for each
3. For verified causes, provide solutions
4. Rank by priority (impact × difficulty)

Project: SPA with webpack and state management
```

### Comparative Analysis

```
Tech selection: GraphQL vs REST API.

Please create a table comparing these dimensions:
| Dimension          | GraphQL | REST API | Winner | Notes |
| ------------------ | ------- | -------- | ------ | ----- |
| Dev Efficiency     |         |          |        |       |
| Performance        |         |          |        |       |
| Learning Curve     |         |          |        |       |
| Ecosystem Maturity |         |          |        |       |

Then recommend according to: mobile backend, microservices, rapid prototyping.
```

### Error Anticipation (Murphy’s Law)

```
My plan for access control: [plan here].

Please act as a “Murphy’s Law expert” and forecast possible problems:
1. Issues in development
2. Bugs in testing
3. Production outages
4. Maintenance challenges

For each: Likelihood, impact, preventive measures.
```

## Advanced Techniques

### Meta-Prompting

```
You are a prompt engineering expert. For any given requirement:

1. Analyze key elements
2. Design an optimized prompt
3. Execute the prompt and return the result

Requirement: I want AI to do code review focusing on performance & security.
Please follow these three steps.
```

### Dynamic Role Switching

```
Scenario: User profile page UX optimization review (meeting)
Please simulate the following roles:

- Frontend dev: Focus on technical implementation & performance
- Product manager: Focus on user/business needs
- Visual designer: Focus on aesthetics & brand consistency
- Interaction designer: Focus on UX & flows

Each raises 2-3 key issues/suggestions, format:
**[Role]**: Viewpoint
```

### Progressive Optimization

```
Task: Optimize this React code for performance.

First Round: Spot major performance issues + simple fixes
Second Round: Deep optimization (e.g., render performance, state management)
Third Round: Architectural optimization (e.g., code splitting, monitoring)

After each, score improvement (1-10).
Code: [insert code]
```

### Multi-Dimensional Evaluation

```
Evaluate frontend animation frameworks (Framer Motion, GSAP, Lottie):

**Technical:**
- Performance (1-10 + reason)
- Dev efficiency (1-10 + reason)
- Learning curve (1-10 + reason)
- Bundle size (1-10 + reason)

**Business:**
- Team fit (e.g., React/Vue)
- Timeline (e.g., 3 months for complex animations)
- Maintenance cost (for long-term iteration/team changes)
- Designer collaboration (e.g., uses After Effects)

**Scenarios:**
- Page transitions
- Complex data viz
- Micro-interactions/hover effects
- Mobile performance

Finally, recommend and provide a decision matrix.
```

### Reverse Engineering Approach

```
Goal: Reduce page load time from 5s to under 2s.

Please reverse analyze:
1. What should time allocation for each step be to hit 2s?
2. Where is the current 5s spent?
3. How much time can each optimization save?
4. What is the order of optimizations?
5. How to validate the effect?

Use data-driven analysis.
```

## Practical Templates

### Code Generation Template

```
Role: {tech stack} expert
Task: Implement {feature}
Requirements:
- Code style: {standard}
- Include error handling
- Add comments
- Provide usage examples
- Consider {special constraints}

Output:
1. Implementation approach (brief)
2. Core code
3. Test cases
4. Notes
```

### Issue Diagnosis Template

```
System diagnosis:

Phenomenon: {symptoms}
Environment: {tech stack & version}
Steps to reproduce: {detailed steps}
Error log: {relevant logs}

Please analyze as follows:
1. Problem localization (ordered possible causes)
2. Diagnosis steps (how to verify)
3. Solutions (temporary + permanent)
4. Prevention (avoiding recurrence)
```

### Technical Research Template

```
Tech research: {tech/framework}

Basic Info:
- Official docs quality: ⭐⭐⭐⭐⭐
- Community activity: GitHub stars/issues/PRs
- Update frequency: Last release date

Tech evaluation:
- Learning curve: [easy/steep] + reason
- Performance: Compare to main alternatives
- Ecosystem: Plugins/tools richness

Business fit:
- Team skills match: [high/med/low]
- Impact on timeline: [accelerate/none/delay]
- Maintenance cost: [high/med/low]

Decision advice: [adopt/watch/abandon] + reason
```

## Best Practices

- **Iterative Optimization:** Start simple, gradually add constraints and requirements.
- **Version Control:** Save effective prompt templates and build your own library.
- **A/B Testing:** Compare different prompt effects.
- **Domain Specialization:** Optimize prompts for specific tech stacks.
- **Feedback Loop:** Continuously adjust based on output quality.

## References for study:

- https://www.promptingguide.ai/zh
- https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/
- https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
