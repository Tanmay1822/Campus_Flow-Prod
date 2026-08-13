import re
import sys

def remove_component(content, comp_name, is_function=False):
    if is_function:
        pattern = r'^function ' + comp_name + r'\b[\s\S]*?^}$'
    else:
        # Matches: const Comp = (...) => { ... }; or const Comp = () => (...);
        # A simpler way is to find "const CompName = " and find matching brace/parenthesis.
        # Regex for this is tricky. Let's use a simple line-by-line matching braces approach.
        pass
    
    lines = content.split('\n')
    out_lines = []
    in_comp = False
    brace_count = 0
    paren_count = 0
    
    for line in lines:
        if not in_comp:
            if line.startswith(f'const {comp_name} ='):
                in_comp = True
                brace_count += line.count('{') - line.count('}')
                paren_count += line.count('(') - line.count(')')
                # edge case: if it ends on the same line
                if brace_count == 0 and paren_count == 0 and (line.endswith(';') or line.endswith(')')):
                    in_comp = False
            else:
                out_lines.append(line)
        else:
            brace_count += line.count('{') - line.count('}')
            paren_count += line.count('(') - line.count(')')
            if brace_count == 0 and paren_count == 0:
                in_comp = False
    
    return '\n'.join(out_lines)

def process_file(filepath, components_to_remove, imports_to_add):
    with open(filepath, 'r') as f:
        content = f.read()
    
    for comp in components_to_remove:
        content = remove_component(content, comp)
        
    # Add imports
    lines = content.split('\n')
    import_index = 0
    for i, line in enumerate(lines):
        if line.startswith('import '):
            import_index = i
    
    lines.insert(import_index + 1, imports_to_add)
    
    with open(filepath, 'w') as f:
        f.write('\n'.join(lines))

if __name__ == '__main__':
    timetable_comps = ['Spinner', 'Alert', 'MultiSelectDropdown', 'BatchListItem', 'LoginPage', 'RegisterPage', 'ClassCell']
    timetable_imports = """
import Spinner from '../components/common/Spinner';
import Alert from '../components/common/Alert';
import MultiSelectDropdown from '../components/common/MultiSelectDropdown';
import BatchListItem from '../components/timetable/BatchList';
import { ClassCell } from '../components/timetable/TimetableGrid';
"""
    process_file('frontend/src/pages/TimetablePage.jsx', timetable_comps, timetable_imports)

    attendance_comps = ['Spinner', 'Alert', 'MultiSelectDropdown', 'BatchListItem', 'LoginPage', 'RegisterPage']
    attendance_imports = """
import Spinner from '../components/common/Spinner';
import Alert from '../components/common/Alert';
import MultiSelectDropdown from '../components/common/MultiSelectDropdown';
import BatchListItem from '../components/timetable/BatchList';
"""
    process_file('frontend/src/pages/AttendancePage.jsx', attendance_comps, attendance_imports)
