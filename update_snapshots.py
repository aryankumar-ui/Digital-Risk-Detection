import re

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\context\AppContext.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the onSnapshot handlers
def replace_on_snapshot(collection_name, array_name):
    # This is a bit tricky, but I can just do a regex replace for all onSnapshot
    pass

# A simpler way is to just add an error callback to the onSnapshot calls.
content = content.replace('});\n\n    unsubScans', '}, (err) => console.log(err));\n\n    unsubScans')
content = content.replace('})));\n    });\n\n    unsubSocial', '})));\n    }, (err) => console.log(err));\n\n    unsubSocial')
content = content.replace('})));\n    });\n\n    unsubApp', '})));\n    }, (err) => console.log(err));\n\n    unsubApp')
content = content.replace('})));\n    });\n\n    unsubReports', '})));\n    }, (err) => console.log(err));\n\n    unsubReports')
content = content.replace('setSelectedReport(data[0]);\n    });\n    \n    unsubNotifs', 'setSelectedReport(data[0]);\n    }, (err) => console.log(err));\n    \n    unsubNotifs')
content = content.replace('})));\n    });\n  };', '})));\n    }, (err) => console.log(err));\n  };')

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\context\AppContext.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("AppContext onSnapshot updated.")
