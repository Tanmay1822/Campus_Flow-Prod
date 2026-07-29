import re

files = [
    'frontend/src/components/TimetableApp.jsx',
    'frontend/src/components/FacialRecognitionApp.jsx'
]

replacements = {
    # Fix the mistake in the container classes
    r'bg-onyx/50 text-champagne border-white/20': 'bg-white/50 text-warm-navy border-camel/20',

    # Backgrounds and main containers
    r'bg-gradient-to-br from-onyx to-midnight-blue text-gray-300': 'bg-cream text-warm-navy',
    r'bg-white/5 backdrop-blur-md border border-white/10': 'bg-warm-ivory border border-camel/20 shadow-sm',
    r'bg-white/10 text-gray-200': 'bg-warm-ivory/50 text-warm-navy',
    r'bg-onyx': 'bg-warm-ivory border border-camel/20 shadow-md',
    
    # Text colors
    r'text-champagne drop-shadow-md': 'text-warm-navy font-bold drop-shadow-sm',
    r'text-champagne font-bold': 'text-warm-navy font-extrabold',
    r'text-champagne': 'text-warm-navy',
    r'text-gray-300': 'text-warm-navy/80',
    r'text-gray-400': 'text-warm-navy/70',
    r'text-gray-500': 'text-warm-navy/60',
    r'text-white': 'text-cream',
    
    # Buttons - Primary
    r'bg-moss-green': 'bg-olive',
    r'hover:bg-moss-green/80 shadow-lg': 'hover:bg-olive/90 shadow-md',
    r'hover:bg-moss-green/80': 'hover:bg-olive/90 shadow-md',
    r'text-moss-green': 'text-olive',
    r'bg-moss-green/20': 'bg-olive/20',
    
    # Buttons - Destructive
    r'bg-burgundy': 'bg-warm-navy text-cream',
    r'hover:bg-burgundy/80 shadow-lg': 'hover:bg-warm-navy/90 shadow-md',
    r'hover:bg-burgundy/80': 'hover:bg-warm-navy/90 shadow-md',
    r'text-burgundy': 'text-warm-navy',
    r'bg-burgundy/20': 'bg-warm-navy/10',
    
    # Buttons - Neutral
    r'bg-umber/80 text-cream': 'bg-camel text-warm-navy font-semibold',
    r'hover:bg-umber shadow-lg': 'hover:bg-camel/90 shadow-md',
    r'hover:bg-umber': 'hover:bg-camel/90 shadow-md',
    
    # Borders & Rings
    r'border-white/10': 'border-camel/20',
    r'border-white/20': 'border-camel/30',
    r'ring-champagne/50': 'ring-camel/50',
    r'focus:border-champagne/50': 'focus:border-camel/50',
    r'divide-white/10': 'divide-camel/20',
    
    # Tables & Lists
    r'hover:bg-white/10': 'hover:bg-warm-ivory',
}

for file_path in files:
    with open(file_path, 'r') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = re.sub(old, new, content)
        
    with open(file_path, 'w') as f:
        f.write(content)
        
print("Updated theme classes in TimetableApp.jsx and FacialRecognitionApp.jsx to warm palette")
