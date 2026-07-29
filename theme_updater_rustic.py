import re

files = [
    'frontend/src/components/TimetableApp.jsx',
    'frontend/src/components/FacialRecognitionApp.jsx'
]

replacements = {
    r'bg-white/50 text-warm-navy border-camel/20': 'bg-white/50 text-bronco border-bronco/10',

    # Backgrounds and main containers
    r'bg-cream text-warm-navy': 'bg-creme text-bronco',
    r'bg-warm-ivory border border-camel/20 shadow-sm': 'bg-stone border border-bronco/10 shadow-sm',
    r'bg-warm-ivory/50 text-warm-navy': 'bg-stone/50 text-bronco',
    r'bg-warm-ivory border border-camel/20 shadow-md': 'bg-stone border border-bronco/10 shadow-md',
    r'bg-warm-ivory border border-camel/20': 'bg-stone border border-bronco/10',
    
    # Text colors
    r'text-warm-navy font-bold drop-shadow-sm': 'text-bronco font-bold drop-shadow-sm',
    r'text-warm-navy font-extrabold': 'text-bronco font-extrabold',
    r'text-warm-navy/80': 'text-bronco/80',
    r'text-warm-navy/70': 'text-bronco/70',
    r'text-warm-navy/60': 'text-bronco/60',
    r'text-warm-navy': 'text-bronco',
    r'text-cream': 'text-creme',
    
    # Buttons - Primary
    r'bg-olive text-creme': 'bg-mesa-clay text-creme',
    r'bg-olive': 'bg-mesa-clay',
    r'hover:bg-olive/90 shadow-md': 'hover:bg-mesa-clay/90 shadow-md',
    r'hover:bg-olive/90': 'hover:bg-mesa-clay/90 shadow-md',
    r'text-olive': 'text-mesa-clay',
    r'bg-olive/20 text-olive': 'bg-mesa-clay/20 text-mesa-clay',
    r'bg-olive/20': 'bg-mesa-clay/20 text-mesa-clay',
    
    # Buttons - Destructive
    r'bg-warm-navy text-creme': 'bg-bronco text-creme',
    r'hover:bg-warm-navy/90 shadow-md': 'hover:bg-bronco/90 shadow-md',
    r'hover:bg-warm-navy/90': 'hover:bg-bronco/90 shadow-md',
    r'bg-warm-navy/10': 'bg-bronco/10 text-bronco',
    
    # Buttons - Neutral
    r'bg-camel text-bronco font-semibold': 'bg-ironwood text-bronco font-semibold',
    r'bg-camel text-bronco': 'bg-ironwood text-bronco',
    r'bg-camel': 'bg-ironwood',
    r'hover:bg-camel/90 shadow-md': 'hover:bg-ironwood/90 shadow-md',
    r'hover:bg-camel/90': 'hover:bg-ironwood/90 shadow-md',
    r'text-camel': 'text-ironwood',
    
    # Borders & Rings
    r'border-camel/20': 'border-bronco/10',
    r'border-camel/30': 'border-bronco/20',
    r'ring-camel/50': 'ring-mesa-clay/50',
    r'focus:border-camel/50': 'focus:border-mesa-clay/50',
    r'divide-camel/20': 'divide-bronco/10',
    
    # Tables & Lists
    r'hover:bg-warm-ivory': 'hover:bg-stone',
    r'hover:bg-stone/50': 'hover:bg-stone',
}

for file_path in files:
    with open(file_path, 'r') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = re.sub(old, new, content)
        
    with open(file_path, 'w') as f:
        f.write(content)
        
print("Updated theme classes in TimetableApp.jsx and FacialRecognitionApp.jsx to rustic palette")
