
import { DevLog } from '@/types/devlog';

const DISCORD_CHANNEL_URL = 'https://discord.com/channels/405213567118213121/990258414900879390';

/**
 * Fetches dev logs from Discord using a proxy or API
 * Note: This is a placeholder implementation that will need to be replaced with actual Discord API calls
 * or a custom backend service that handles the Discord API authentication and data fetching
 */
export async function fetchDevLogs(): Promise<DevLog[]> {
  try {
    // For demonstration purposes, we're returning mock data
    // In a real implementation, you would fetch from Discord API or your own backend
    console.log(`Would fetch from Discord channel: ${DISCORD_CHANNEL_URL}`);
    
    // Simulating API response delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      {
        id: '1',
        title: 'Version 0.35.0 Release',
        content: 'We are excited to announce the release of version 0.35.0 with new features including improved mod management and UI enhancements.',
        date: '2025-04-01',
        author: 'XMCL Team',
        imageUrl: '/assets/images/bc119197-ca8b-4f7f-8988-823cc947ad73.png'
      },
      {
        id: '2',
        title: 'Development Update - Work in Progress',
        content: 'We are currently working on enhancing the multiplayer experience and fixing reported bugs. Stay tuned for more updates!',
        date: '2025-03-25',
        author: 'Development Team',
        imageUrl: '/assets/images/a39086fb-5549-43c0-a69e-217c717d938e.png'
      }
    ];
  } catch (error) {
    console.error('Error fetching dev logs:', error);
    return [];
  }
}

export async function fetchDevLog(id: string): Promise<DevLog | null> {
  try {
    const logs = await fetchDevLogs();
    return logs.find(log => log.id === id) || null;
  } catch (error) {
    console.error(`Error fetching dev log ${id}:`, error);
    return null;
  }
}
