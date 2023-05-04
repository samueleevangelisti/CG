'''
make-sphere-obj.py
'''
from os import path
import math
import json



RADIUS = 1
Z_REGION = 20
XY_REGION = 30
Z_STEP = math.pi / Z_REGION
XY_STEP = (2 * math.pi) / XY_REGION

OBJ_V_TEMPLATE = \
'''v {:.6f} {:.6f} {:.6f}'''

OBJ_F_V_TEMPLATE = \
'''{:d}//'''

OBJ_F_TEMPLATE = \
'''f {f_v_list:s}'''

OBJ_TEMPLATE = \
'''mtllib sphere.mtl
o sphere
{v_list:s}
usemtl plastic
s off
{f_list:s}
'''

MTL_TEMPLATE = \
'''newmtl plastic
Ns 400.0
Ka 0.000000 0.000000 0.000000
Kd 1.000000 0.000000 0.000000
Ks 0.500000 0.500000 0.500000
Ke 0.0 0.0 0.0
Ni 1.0
d 1.000000
illum 2
'''



def compute_point(theta, phi):
    return [round(e, 6) for e in [
        RADIUS * math.cos(theta) * math.sin(phi),
        RADIUS * math.sin(theta) * math.sin(phi),
        RADIUS * math.cos(phi)
    ]]



if __name__ == '__main__':

    phi = 0
    phi_list = []
    while phi <= math.pi:
        phi_list.append(phi)
        phi += Z_STEP
    print('phi_list')
    print(json.dumps(phi_list, indent=2))

    theta = 0
    theta_list = []
    while theta < 2 * math.pi:
        theta_list.append(theta)
        theta += XY_STEP
    print('theta_list')
    print(json.dumps(theta_list, indent=2))

    vertex_list = []
    vertex_list.append(compute_point(theta_list[0], phi_list[0]))
    for phi in phi_list[1:-1]:
        for theta in theta_list:
            vertex_list.append(compute_point(theta, phi))
    vertex_list.append(compute_point(theta_list[0], phi_list[-1]))
    print('vertex_list_list')
    print(json.dumps(vertex_list, indent=2))

    v_list = [OBJ_V_TEMPLATE.format(vertex[0], vertex[1], vertex[2]) for vertex in vertex_list]
    print('v_list')
    print(json.dumps(v_list, indent=2))

    f_list = []
    for i in range(XY_REGION):
        f_list.append(OBJ_F_TEMPLATE.format(f_v_list=' '.join(OBJ_F_V_TEMPLATE.format(e) for e in [2 + i, 2 + ((i + 1) % XY_REGION), 1])))
    for j in range(Z_REGION - 2):
        for i in range(XY_REGION):
            f_list.append(OBJ_F_TEMPLATE.format(f_v_list=' '.join(OBJ_F_V_TEMPLATE.format(e) for e in [2 + ((j + 1) * XY_REGION) + i, 2 + ((j + 1) * XY_REGION) + ((i + 1) % XY_REGION), 2 + (j * XY_REGION) + ((i + 1) % XY_REGION), 2 + (j * XY_REGION) + i])))
    for i in range(XY_REGION):
        f_list.append(OBJ_F_TEMPLATE.format(f_v_list=' '.join(OBJ_F_V_TEMPLATE.format(e) for e in [len(v_list), len(v_list) - XY_REGION + ((i + 1) % XY_REGION), len(v_list) - XY_REGION + i])))
    print('f_list')
    print(json.dumps(f_list, indent=2))

    with open(path.join(path.dirname(__file__), 'resources/sphere.obj'), 'w', encoding='utf-8') as file:
        file.write(OBJ_TEMPLATE.format(v_list='\n'.join(v_list), f_list='\n'.join(f_list)))

    with open(path.join(path.dirname(__file__), 'resources/sphere.mtl'), 'w', encoding='utf-8') as file:
        file.write(MTL_TEMPLATE.format())
