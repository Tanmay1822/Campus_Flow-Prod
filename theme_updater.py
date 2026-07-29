import re

files = [
    'frontend/src/components/TimetableApp.jsx',
    'frontend/src/components/FacialRecognitionApp.jsx'
]

replacements = {
    # Backgrounds and main containers
    r'bg-gray-100': 'bg-gradient-to-br from-onyx to-midnight-blue text-gray-300',
    r'bg-white': 'bg-white/5 backdrop-blur-md border border-white/10',
    r'bg-gray-50': 'bg-white/5',
    r'bg-gray-200': 'bg-white/10 text-gray-200',
    r'bg-gray-800': 'bg-onyx',
    
    # Text colors
    r'text-gray-800': 'text-champagne drop-shadow-md',
    r'text-gray-900': 'text-champagne',
    r'text-gray-700': 'text-gray-300',
    r'text-gray-600': 'text-gray-400',
    r'text-gray-500': 'text-gray-500',
    r'text-blue-600': 'text-champagne',
    r'text-blue-700': 'text-champagne font-bold',
    
    # Buttons - Primary
    r'bg-blue-600': 'bg-moss-green',
    r'hover:bg-blue-700': 'hover:bg-moss-green/80 shadow-lg',
    r'bg-blue-500': 'bg-moss-green',
    r'hover:bg-blue-600': 'hover:bg-moss-green/80 shadow-lg',
    
    # Buttons - Secondary/Success
    r'bg-green-600': 'bg-moss-green',
    r'hover:bg-green-700': 'hover:bg-moss-green/80 shadow-lg',
    r'bg-green-500': 'bg-moss-green',
    r'hover:bg-green-600': 'hover:bg-moss-green/80 shadow-lg',
    r'text-green-600': 'text-moss-green',
    r'text-green-800': 'text-moss-green',
    r'bg-green-100': 'bg-moss-green/20 text-moss-green',
    
    # Buttons - Destructive
    r'bg-red-500': 'bg-burgundy',
    r'hover:bg-red-600': 'hover:bg-burgundy/80 shadow-lg',
    r'text-red-500': 'text-burgundy',
    r'text-red-600': 'text-burgundy',
    r'text-red-700': 'text-burgundy',
    r'bg-red-100': 'bg-burgundy/20 text-burgundy',
    
    # Buttons - Neutral
    r'bg-gray-300': 'bg-umber/80 text-white',
    r'hover:bg-gray-400': 'hover:bg-umber shadow-lg',
    
    # Borders & Rings
    r'border-gray-200': 'border-white/10',
    r'border-gray-300': 'border-white/20',
    r'border-b': 'border-b border-white/10',
    r'ring-blue-500': 'ring-champagne/50',
    r'focus:border-blue-500': 'focus:border-champagne/50',
    r'divide-gray-200': 'divide-white/10',
    
    # Tables & Lists
    r'hover:bg-gray-50': 'hover:bg-white/10',
}

for file_path in files:
    with open(file_path, 'r') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = re.sub(old, new, content)
        
    with open(file_path, 'w') as f:
        f.write(content)
        
print("Updated theme classes in TimetableApp.jsx and FacialRecognitionApp.jsx")
