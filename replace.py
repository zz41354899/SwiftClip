import re

def inplace_change(filename, old_str, new_str):
    with open(filename, 'r') as f:
        s = f.read()
    if old_str not in s:
        print(f"FAILED {filename}")
        return
    with open(filename, 'w') as f:
        f.write(s.replace(old_str, new_str))
    print(f"SUCCESS {filename}")

# ProductLaunch.tsx
inplace_change("remotion/ProductLaunch.tsx", 'background: "#000000",', 'background: "#ffffff",')
inplace_change("remotion/ProductLaunch.tsx", 'color: "#ffffff",', 'color: "#1d1d1f",')
inplace_change("remotion/ProductLaunch.tsx", 'color="#ffffff"', 'color="#1d1d1f"')
inplace_change("remotion/ProductLaunch.tsx", 'background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)",', 'background: "radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 60%)",')
inplace_change("remotion/ProductLaunch.tsx", 'background: "rgba(255,255,255,0.1)",', 'background: "rgba(255,255,255,0.7)",')
inplace_change("remotion/ProductLaunch.tsx", 'border: "1px solid rgba(255,255,255,0.15)",', 'border: "1px solid rgba(0,0,0,0.05)",\n          boxShadow: "0 20px 40px rgba(0,0,0,0.06)",')

# VerticalStory.tsx
inplace_change("remotion/VerticalStory.tsx", 'background: "#000000",', 'background: "#f5f5f7",')
inplace_change("remotion/VerticalStory.tsx", 'color: "white",', 'color: "#1d1d1f",')
inplace_change("remotion/VerticalStory.tsx", 'background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)",', 'background: "radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 60%)",')
inplace_change("remotion/VerticalStory.tsx", 'background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)",', 'background: "radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 60%)",')
inplace_change("remotion/VerticalStory.tsx", 'background: "rgba(255,255,255,0.08)",', 'background: "rgba(255,255,255,0.7)",')
inplace_change("remotion/VerticalStory.tsx", 'border: "1px solid rgba(255,255,255,0.15)",', 'border: "1px solid rgba(0,0,0,0.05)",\n          boxShadow: "0 20px 40px rgba(0,0,0,0.06)",')
inplace_change("remotion/VerticalStory.tsx", 'background: "rgba(30,30,32,0.6)",\n                backdropFilter: "blur(40px)",\n                border: "1px solid rgba(255,255,255,0.1)",', 'background: "rgba(255,255,255,0.7)",\n                backdropFilter: "blur(40px)",\n                border: "1px solid rgba(0,0,0,0.05)",\n                boxShadow: "0 20px 40px rgba(0,0,0,0.06)",')
inplace_change("remotion/VerticalStory.tsx", 'color="#ffffff"', 'color="#0066cc"')
inplace_change("remotion/VerticalStory.tsx", 'color: "#f5f5f7",', 'color: "#1d1d1f",')
inplace_change("remotion/VerticalStory.tsx", 'background: "rgba(255,255,255,0.1)",', 'background: "rgba(0,102,204,0.1)",')

# SaaSPromo.tsx
inplace_change("remotion/SaaSPromo.tsx", 'background: "#000000",', 'background: "#ffffff",')
inplace_change("remotion/SaaSPromo.tsx", 'color: "#ffffff",', 'color: "#1d1d1f",')
inplace_change("remotion/SaaSPromo.tsx", 'background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)",', 'background: "radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 60%)",')
inplace_change("remotion/SaaSPromo.tsx", 'backgroundImage:\n          "linear-gradient(135deg, #c0c0c0 0%, #ffffff 100%)",', 'backgroundImage:\n          "linear-gradient(135deg, #1d1d1f 0%, #86868b 100%)",')
inplace_change("remotion/SaaSPromo.tsx", 'color: "#f5f5f7",', 'color: "#1d1d1f",')
inplace_change("remotion/SaaSPromo.tsx", 'color: "#fff"', 'color: "#0066cc"')
inplace_change("remotion/SaaSPromo.tsx", 'background: "rgba(255,255,255,0.06)",\n          border: "1px solid rgba(255, 255, 255, 0.1)",', 'background: "rgba(255,255,255,0.7)",\n          border: "1px solid rgba(0,0,0,0.05)",\n          boxShadow: "0 20px 40px rgba(0,0,0,0.06)",')

