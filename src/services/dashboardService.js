/**
 * Dashboard Service - Transforms conversation data for dashboard display
 */

/**
 * Transform conversation to dashboard project format
 */
export function transformToProject(conversation) {
  const completionPercentage =
    (conversation.meta?.completionPercentage ?? conversation.meta?.score ?? 0);
  const isCompleted = completionPercentage >= 80 || conversation.state === 'completed';
  
  // Get AI assistant name for icon
  const aiAssistant = conversation.participants?.find(p => p.role === 'assistant');
  
  // Determine priority based on deadline proximity
  const getPriority = (deadline) => {
    if (!deadline) return 'Medium';
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const daysUntil = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 0) return 'High'; // Overdue
    if (daysUntil <= 3) return 'High';
    if (daysUntil <= 7) return 'Medium';
    return 'Low';
  };
  
  return {
    id: conversation._id,
    title: conversation.projectName || 'Untitled Project',
    description: conversation.projectDescription ||
                 conversation.requirements?.message?.project_description || 
                 conversation.requirements?.message?.description || 
                 'No description available',
    priority: getPriority(conversation.deadline),
    progress: completionPercentage,
    status: isCompleted ? 'completed' : 'in-progress',
    deadline: conversation.deadline,
    aiAssistant: aiAssistant?.name || 'AI Assistant',
    createdAt: conversation.createdAt,
    updatedAt: conversation.updatedAt,
  };
}

/**
 * Transform conversation to recent project format (sidebar)
 */
export function transformToRecentProject(conversation) {
  // Color based on project type or random
  const colors = ['bg-green-500', 'bg-yellow-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500'];
  const colorIndex = conversation.projectId ? conversation.projectId % colors.length : 0;
  
  return {
    id: conversation._id,
    name: conversation.projectName || 'Untitled Project',
    color: colors[colorIndex],
  };
}

/**
 * Transform conversation to deadline format
 */
export function transformToDeadline(conversation) {
  const deadline = new Date(conversation.deadline);
  const priority = getPriorityFromDeadline(deadline);
  
  return {
    id: conversation._id,
    month: deadline.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
    date: deadline.getDate().toString().padStart(2, '0'),
    title: conversation.projectName || 'Untitled Project',
    description: conversation.requirements?.message?.project_description?.substring(0, 50) || 
                 'Project deadline approaching',
    priority: priority,
    deadlineTimestamp: deadline.getTime(), // Add timestamp for filtering
  };
}

/**
 * Get priority based on deadline proximity
 */
function getPriorityFromDeadline(deadline) {
  const now = new Date();
  const daysUntil = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
  
  if (daysUntil < 0 || daysUntil <= 2) return 'High';
  if (daysUntil <= 7) return 'Medium';
  return 'Low';
}

/**
 * Transform to InProgress project card format
 */
export function transformToInProgressProject(conversation) {
  const project = transformToProject(conversation);
  
  // Map priority to color scheme
  const priorityColors = {
    High: { bg: 'bg-red-100', text: 'text-red-800' },
    Medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    Low: { bg: 'bg-green-100', text: 'text-green-800' },
  };
  
  // Map project type to icon and color
  const getProjectIcon = () => {
    return {
      icon: 'RiLayout4Line', // Default icon, can be customized based on project type
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    };
  };
  
  const iconConfig = getProjectIcon();
  const deadline = new Date(conversation.deadline);
  
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    icon: iconConfig.icon,
    iconBg: iconConfig.iconBg,
    iconColor: iconConfig.iconColor,
    priority: project.priority,
    priorityColor: priorityColors[project.priority] || priorityColors.Medium,
    progress: project.progress,
    progressColor: 'bg-blue-500',
    dueDate: deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  };
}

/**
 * Transform to completed project format
 */
export function transformToCompletedProject(conversation) {
  const completedDate = conversation.updatedAt || conversation.createdAt;
  const completion = (conversation.meta?.completionPercentage ?? conversation.meta?.score ?? 0);
  const deadlineDate = conversation.deadline ? new Date(conversation.deadline) : null;
  
  return {
    id: conversation._id,
    title: conversation.projectName || 'Untitled Project',
    date: new Date(completedDate).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }),
    progress: completion,
    deadline: deadlineDate ? deadlineDate.toISOString() : null,
    deadlineTimestamp: deadlineDate ? deadlineDate.getTime() : null,
  };
}
