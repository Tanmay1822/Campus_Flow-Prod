import re
import os

with open('frontend/src/components/TimetableApp.jsx', 'r') as f:
    content = f.read()

# We need to extract the TimetableApp logic.
# Wait, this might be too complex for a simple script. Let's just create TimetablePage.jsx by manually copying and adapting.
