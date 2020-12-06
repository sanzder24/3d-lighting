/**
 * @author Zachary Wartell && ..
 * @version 1.x-9
 *
 * @file Sphere.js contains routines for tessellation of a sphere
 *
 * Students are given a initial set of classes and functions are expected to extend these and add
 * additional functions to this file as needed.
 */


/**
 * @author ..
 * @description generate vertices that tessellate a sphere of radius 1.
 *
 * @param {Number} divisions number of sub-divisions with which to create the tessellated sphere
 * @param {Number[][]} positions Array of x,y,z positions of vertices of triangles that tessellate a unit sphere
 * @param {Number[][]} indices Array of triples of integer indices into "positions" where each triple specifies a triangle on the sphere
 */
function generate_sphere(divisions, positions, indices) {  // Taken from PointLightedSphere.js
    /**
    @todo [STUDENT] REQUIRED: Tessellation:  Use parametric equation of a sphere using spherical coordinates as the
    two parameters of the equation to generate points on the sphere, see http://mathworld.wolfram.com/Sphere.html.

    The easiest approach is to create the indices assuming rendering will be done with GL_TRIANGLES.
     */
    var SPHERE_DIV = divisions;	//13+
    var i, ai, si, ci;
    var j, aj, sj, cj;
    var p1, p2;

    var positions = [];
    var indices = [];
    
    // Generate coordinates
    for (j = 0; j <= SPHERE_DIV; j++) {
        aj = j * Math.PI / SPHERE_DIV;		//angle forming the jth latitude line
        sj = Math.sin(aj);		//Determines (one of?) the x coordinate of the jth latitude line
        cj = Math.cos(aj);		//Determines the y coordinate of the jth latitude line
        for (i = 0; i <= SPHERE_DIV; i++) {
            ai = i * 2 * Math.PI / SPHERE_DIV;
            si = Math.sin(ai);
            ci = Math.cos(ai);

            positions.push((si * sj)*.1);  // X
            positions.push((cj)*.1);       // Y
            positions.push((ci * sj)*.1);  // Z
           
        }
    }

    
    for (j = 0; j < SPHERE_DIV; j++) {
        for (i = 0; i < SPHERE_DIV; i++) {
            p1 = j * (SPHERE_DIV+1) + i;
            p2 = p1 + (SPHERE_DIV+1);

            indices.push(p1);
            indices.push(p2);
            indices.push(p1 + 1);

            indices.push(p1 + 1);
            indices.push(p2);
            indices.push(p2 + 1);

            
        }
    }

    return [positions, indices]
}