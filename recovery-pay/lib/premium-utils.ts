import { supabase } from './supabase';

/**
 * Check if a user has premium access
 * @param userId The user ID to check
 * @returns Promise<boolean> True if the user has premium access
 */
export async function checkPremiumUser(userId: string): Promise<boolean> {
  try {
    // Get the user's organization
    const { data: userOrg, error: orgError } = await supabase
      .from('user_organizations')
      .select('organization_id')
      .eq('user_id', userId)
      .single();
    
    if (orgError || !userOrg) {
      console.error('Error fetching user organization:', orgError);
      return false;
    }
    
    // Check if the organization has a premium subscription
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('plan_id, status')
      .eq('organization_id', userOrg.organization_id)
      .eq('status', 'active')
      .single();
    
    if (subError) {
      // For development purposes, return true to allow testing
      if (process.env.NODE_ENV === 'development') {
        return true;
      }
      
      console.error('Error fetching subscription:', subError);
      return false;
    }
    
    // Check if the plan is premium
    return subscription?.plan_id === 'premium';
  } catch (error) {
    console.error('Error checking premium status:', error);
    
    // For development purposes, return true to allow testing
    if (process.env.NODE_ENV === 'development') {
      return true;
    }
    
    return false;
  }
}

// Mock implementation for premium features
export function isPremiumUser(): boolean {
  // For development purposes, return true to enable premium features
  return true;
} 