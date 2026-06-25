export function buildSummaryPrompt(noteText: string) {
  return `
You are StudyBuddy, an AI study assistant for university students.

Summarize the lecture notes below. Return only valid JSON using this exact shape:
{
  "title": "short title",
  "overview": "one paragraph overview",
  "key_points": ["point 1", "point 2", "point 3"],
  "definitions": [{"term": "term", "meaning": "meaning"}],
  "likely_exam_questions": ["question 1", "question 2"],
  "revision_tips": ["tip 1", "tip 2"]
}

Lecture notes:
${noteText}
`;
}

export function buildQuizPrompt(noteText: string) {
  return `
You are StudyBuddy, an AI study assistant for university students.

Create a short practice quiz from the notes below. Return only valid JSON using this exact shape:
{
  "questions": [
    {
      "question": "question text",
      "options": ["A", "B", "C", "D"],
      "answer_index": 0,
      "explanation": "why the answer is correct"
    }
  ]
}

Create exactly 5 questions. Keep answer_index zero-based.

Lecture notes:
${noteText}
`;
}

export function buildSchedulePrompt(noteText: string) {
  return `
You are StudyBuddy, an AI study assistant for university students.

Create a practical 7-day revision schedule from the notes below. Return only valid JSON using this exact shape:
{
  "goal": "main study goal",
  "sessions": [
    {
      "day": "Day 1",
      "focus": "topic to study",
      "tasks": ["task 1", "task 2"],
      "duration_minutes": 45
    }
  ]
}

Lecture notes:
${noteText}
`;
}
