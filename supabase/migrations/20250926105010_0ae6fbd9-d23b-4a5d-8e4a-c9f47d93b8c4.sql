-- Create leads table for ROI calculator
CREATE TABLE public.roi_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  clinic_name TEXT,
  calculator_data JSONB,
  result JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.roi_leads ENABLE ROW LEVEL SECURITY;

-- Create policies (public access for lead capture)
CREATE POLICY "Anyone can insert leads" 
ON public.roi_leads 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can select leads by email" 
ON public.roi_leads 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_roi_leads_updated_at
BEFORE UPDATE ON public.roi_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();