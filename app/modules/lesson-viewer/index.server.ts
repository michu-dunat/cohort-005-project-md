// The lesson page's queries: course outline, progress, Discussion threads, quizzes.
export {
  getCourseWithDetails,
  getLessonById,
  getModuleById,
  getUserById,
  flattenCourseLessons,
} from "./lib/course";
export {
  getLessonProgress,
  getLessonProgressForCourse,
  markLessonComplete,
  markLessonInProgress,
  getLastWatchPosition,
  calculateWatchProgress,
} from "./lib/progress";
export {
  getCommentById,
  getLessonThread,
  renderThread,
} from "./lib/thread.server";
export {
  getQuizById,
  getQuizByLessonId,
  getQuizWithQuestions,
  getBestAttempt,
  computeResult,
} from "./lib/quiz";
