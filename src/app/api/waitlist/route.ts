import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase';

// Define the schema for validation
const waitlistSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  feedback: z.string().optional(),
  userType: z.enum(["buyer", "seller", "influencer"]),
});

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the data
    const validatedData = waitlistSchema.parse(body);
    
    // Insert data into Supabase
    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .insert([
        {
          email: validatedData.email,
          name: validatedData.name,
          feedback: validatedData.feedback || '',
          user_type: validatedData.userType,
        }
      ])
      .select();
    
    if (error) {
      console.error('Supabase error:', error);
      
      // Check if it's a duplicate email error
      if (error.code === '23505') {
        return NextResponse.json(
          { success: false, message: 'This email is already on our waitlist.' },
          { status: 400 }
        );
      }
      
      throw error;
    }
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully joined the waitlist',
      id: data?.[0]?.id
    });
    
  } catch (error) {
    console.error('Waitlist API error:', error);
    
    // Check if it's a validation error
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid form data', errors: error.errors },
        { status: 400 }
      );
    }
    
    // Generic error
    return NextResponse.json(
      { success: false, message: 'Failed to join waitlist. Please try again later.' },
      { status: 500 }
    );
  }
}
