// View tracking utility for real user analytics
interface ViewData {
  totalViews: number;
  questionViews: Record<number, number>;
  lastUpdated: number;
}

class ViewTracker {
  private static STORAGE_KEY = 'jobx_views';
  private static API_ENDPOINT = '/api/views'; // Backend endpoint for production

  // Get view data from localStorage
  private static getViewData(): ViewData {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // If corrupted, return default
      }
    }
    return {
      totalViews: 0,
      questionViews: {},
      lastUpdated: Date.now()
    };
  }

  // Save view data to localStorage
  private static saveViewData(data: ViewData): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  // Track a view for a specific question
  static trackQuestionView(questionId: number): void {
    const data = this.getViewData();
    
    // Increment question-specific views
    data.questionViews[questionId] = (data.questionViews[questionId] || 0) + 1;
    
    // Increment total views
    data.totalViews += 1;
    data.lastUpdated = Date.now();
    
    this.saveViewData(data);
    
    // In production, also send to backend
    this.sendToBackend(questionId);
  }

  // Track a general page view (for homepage, etc.)
  static trackPageView(page: string): void {
    const data = this.getViewData();
    data.totalViews += 1;
    data.lastUpdated = Date.now();
    this.saveViewData(data);
    
    // In production, send to backend
    this.sendToBackend(null, page);
  }

  // Get total views
  static getTotalViews(): number {
    const data = this.getViewData();
    return data.totalViews;
  }

  // Get views for a specific question
  static getQuestionViews(questionId: number): number {
    const data = this.getViewData();
    return data.questionViews[questionId] || 0;
  }

  // Send view data to backend (for production)
  private static async sendToBackend(questionId?: number | null, page?: string): Promise<void> {
    try {
      // This would be implemented when you have a backend
      // await fetch(this.API_ENDPOINT, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     questionId,
      //     page,
      //     timestamp: Date.now(),
      //     userAgent: navigator.userAgent,
      //     referrer: document.referrer
      //   })
      // });
    } catch (error) {
      console.warn('Failed to send view data to backend:', error);
    }
  }

  // Get analytics data (for admin dashboard)
  static getAnalytics(): ViewData {
    return this.getViewData();
  }

  // Reset analytics (for testing)
  static resetAnalytics(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export default ViewTracker; 