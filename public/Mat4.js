/**
 * @author Zachary Wartell, ...
 * @version 1.x-21
 *
 * @file Mat4.js is a set of geometry and linear algebra functions related to 4x4 Matrices.
 *
 * Students are given skeleton code for an initial set of classes, methods, and functions and are expected to implement,
 * and extend them and add additional functions to this file as needed.
 *
 */


/**
 * @author Zachary Wartell
 *
 * @description  Return determinant of a 4x4 matrix
 *
 * @param {Number} M_00
 * @param {Number} M_10
 * @param {Number} M_20
 * @param {Number} M_30
 * @param {Number} M_01
 * @param {Number} M_11
 * @param {Number} M_21
 * @param {Number} M_31
 * @param {Number} M_02
 * @param {Number} M_12
 * @param {Number} M_22
 * @param {Number} M_32
 * @param {Number} M_03
 * @param {Number} M_13
 * @param {Number} M_23
 * @param {Number} M_33
 */


function det4(M_00, M_10, M_20, M_30,
              M_01, M_11, M_21, M_31,
              M_02, M_12, M_22, M_32,
              M_03, M_13, M_23, M_33)
 {
    var R0 = M_00 *       det3(M_11, M_21,M_31,
                               M_12, M_22, M_32,
                               M_13, M_23, M_33);
    var R1 = -1 * (M_10 * det3(M_01, M_21, M_31,
                               M_02, M_22, M_32, 
                               M_03, M_23, M_33));
    var R2 = M_20 *       det3(M_01, M_11, M_31, 
                               M_02, M_12, M_32, 
                               M_03, M_13, M_33 );
    var R3 = -1 * (M_30 * det3(M_01, M_11, M_21, 
                               M_02, M_12, M_22, 
                               M_03, M_13, M_23 ));
    var det = R1 + R2 + R3 + R0;
    return det;

    // @todo [STUDENT REQUIRED] implement
  //  throw new Error("UNIMPLEMENTED FUNCTION");
 }



/*
*   Misc constants related to Mat4 class
 */
const Mat4_ROWS=4;
const Mat4_COLUMNS=4;
const Mat4_SIZE=Mat4_ROWS*Mat4_COLUMNS;

/**
 * @author Zachary Wartell
 * @version 1.x-21
 * @class Mat4 is a 4x4 linear algebra matrix
 *
 * Elements are internally stored in 'column major' layout [{@link Cite.2}], i.e. for matrix M with math convention M_rc (r=row,c=column)
 * ```javascript
 *    this.array = [ M_00, M_10, M_20, M_30,  // 1st _column_
 *                   M_01, M_11, M_21, M_31,  // 2nd _column_
 *                   M_02, M_12, M_22, M_32.  // 3rd _column_
 *                   M_03, M_13, M_23, M_33]; // 4th _column_
 * ```
 *
 * Equivalently:
 * ```javascript
 *    this.array [0]  = M_00;  this.array  [4] = M_01;  this.array  [8] = M_02; this.array [12] = M_03;
 *    this.array [1]  = M_10;  this.array  [5] = M_11;  this.array  [9] = M_12; this.array [13] = M_13;
 *    this.array [2]  = M_20;  this.array  [6] = M_21;  this.array [10] = M_22; this.array [14] = M_23;
 *    this.array [3]  = M_30;  this.array  [7] = M_31;  this.array [11] = M_32; this.array [15] = M_33;
 * ```
 *
 * When the constructor is called with a Array or Float32Array parameter the above convention should be followed.
 *
 * details:
 *
 * - Note, column major order is consistent with OpenGL and GLSL [{@link Cite.3}].
 * - For efficiency and GLSL compatibility we use a TypedArray [{@link Cite.1}].
 */
class Mat4
  {

    /**
     * Constructor of Mat4, a 4x4 matrix
     *
     * Argument Options [Overloaded]:
     * - null  | default, initializes to I
     * - Number[] | initial value (size 16)
     * - Float32Array | initial value (size 16)
     * - Mat4 | initial value
     * - Number, Number ..., Number | M_00,M_10,M_20,M_30,  M_01, M_11, M_21, M_31,  M_02,M_12,M_22,M_32, M_03,M_13,M_23,M_33
     *
     * @param {*} - multiple options, see description for details
     * @author Zachary Wartell
     * @@param {(null | Number[] | Float32Array | Mat4 | ...Number )} matrix - INITIAL VALUE - null | Array (size 16) | Float32Array (size 16) | Mat4 | or 16 Number's in column major order
     * @@param {null | Number[] | Float32Array | Mat4 | ...Number } matrix - initial value for this Mat4
     * @@param {null | Number[] | Float32Array | Mat4 | M_00,M_10,M_20,M_30,  M_01, M_11, M_21, M_31,  M_02,M_12,M_22,M_32, M_03,M_13,M_23,M_33 } matrix - initial value for this Mat4
     * @@param {*} - multiple options, see description for details
     */    
    constructor()
    {
        if (arguments.length === Mat4_SIZE)
        {
            this.array.set(
                argument[0], argument[1], argument[2], argument[3],
                argument[4], argument[5], argument[6], argument[7],
                argument[8], argument[9], argument[10],argument[11],
                argument[12],argument[13],argument[14],argument[15]);
    
        } else if (arguments.length === 1)
        {
            if (arguments[0] instanceof Array)
            {
                this.array = new Float32Array(Mat4_SIZE);
                this.array.set(arguments[0]);
            } else if (arguments[0] instanceof Mat4)
            {
                this.array = new Float32Array(Mat4_SIZE);
                this.array.set(arguments[0].array);
            } else
                throw new Error("Unsupported Type");
        } else
        {
            this.array = new Float32Array(Mat4_SIZE);
            this.array.set(
                [1.0, 0.0, 0.0, 0.0,
                    0.0, 1.0, 0.0, 0.0,
                    0.0, 0.0, 1.0, 0.0,
                    0.0, 0.0, 0.0, 1.0]);
        }
    }
    /**
     * @author Zachary Wartell
     * @description  returns element in row r, column c of this Mat4
     * @param {Number} r - row
     * @param {Number} c - column
     * @returns {Number}
     */
    get (r, c)
    {
        return this.array[c * Mat4_ROWS + r];  // note use of column-major ordering, @see #R3
    }

    /**
     * @author Zachary Wartell
     *
     * @description  set elements in this Mat4
     *
     * Argument Options (Overloaded):
     *
     * - Mat4 | Mat4 whose values are copied to this Mat4
     * - Number, Number, Number | row, column , value - set element 'row','column' to to 'value'
     *
     * @param {*} - multiple options, see description for details
     * @@param {(Mat4 | Number, Number, Number )} - Mat4 or row, column , value
     * @@param {Mat4 | Number} - Mat4 or row
     * @@param {null | Number} [column] column of element to set
     * @@param {null | Number} [value] new value of single element
     * @@todo ZJW: [12/7/18] regarding above .. JSDoc seems to have poor support for function overloading
     */
    set ()
    {
        if (arguments.length === 3)
        {
            const r = arguments[0], c = arguments [1];
            this.array[c * Mat4_ROWS + r] = arguments[2];   // note use of column-major ordering, @see #R3
        } else if (arguments.length === 1)
        {
            if (arguments[0] instanceof Array)
            {
                this.array = new Float32Array(Mat4_SIZE);
                this.array.set(arguments[0]);
            } else if (arguments[0] instanceof Mat4)
            {
                this.array = new Float32Array(Mat4_SIZE);
                this.array.set(arguments[0].array);
            } else
                throw new Error("Unsupported Type");
        }  else
            throw new Error("Unsupported Type");
    }



    /**
     * @author Zachary Wartell
     * @description   returns the determinant of this Mat4
     * @returns {Number}
     */
    det ()
    {
        //return det4(...this.array); // ES6 spread operator
        return det4.apply(null,this.array); // ES6 spread operator failing when using javascript-obfuscator
    }

    /**
     * @author Zachary Wartell
     *
     * @description  Right side multiply this Mat4 by a matrix 'matrix', i.e.
     * in mathematical notation, let M equal this Mat4, and let M1 equal the argument 'matrix':
     *
     *     M' = M * M1
     *
     * @param {Mat4} matrix
     */
    multiply (matrix)
    {
        if (!(matrix instanceof Mat4))
            throw new Error("Unsupported Type");
        else{
            var row, col;
            var M  = new Float32Array(16);
            var M1 = matrix;
            //algorithm converting the matrix to single dimentionall array and matrix mutiplication
            for(row = 0; row <= 3; row++){
                for(col = 0; col <= 3;col++){
                    M[col*4+row] = this.get(row,0) * M1.get(0,col) + this.get(row,1) * M1.get(1,col) + this.get(row,2) * M1.get(2,col)+ this.get(row,3) * M1.get(3,col);
                }
            }
        this.array = M;

        }
        }
    /**
     * @author Zachary Wartell
     *
     * @description  Left side multiply this Mat4 by a matrix 'matrix' (denoted M1).
     * In mathematical notation, let M equal this Mat4, and M1 equal argument 'matrix':
     *
     *    M' = M1 * M
     *
     * For many calculations Mat4.multiply (a 'right hand side multiply') is sufficient, but occasionally being able to leftMultiply is useful.
     *
     * @param {Mat4} matrix - matrix to multiply this Mat4 by
     */
    leftMultiply (matrix)
    {
        if (!(matrix instanceof Mat4))
            throw new Error("Unsupported Type");
       else { 
        var row,col;
        var res = new Float32Array(16);
    
         for(row = 0; row < 4; row++){
            for(col = 0; col < 4; col++){
                res[col * 4 + row] = matrix.get(row,0) * this.get(0,col) + matrix.get(row,1) * this.get(1,col) + 
                matrix.get(row,2) * this.get(2,col) + matrix.get(row,3) * this.get(3,col); 
            }
        }

        this.array = res;/* storing values in [1 4 8  12
                                               1 5 9  13
                                               2 6 10 14
                                               3 7 11 15 ]
    */
        // @todo [STUDENT] (as needed) implement
       // throw new Error("UNIMPLEMENTED FUNCTION");
    } }

    /**
     * @author Zachary Wartell
     * @description  Set this Mat4 to a new 2D translation matrix that translates by vector [x,y,z]
     *
     * @param { Number[] } translation translation vector
     * @param { Number } translation[].0 x
     * @param { Number } translation[].1 y
     * @param { Number } translation[].2 z
     */
    setTranslate (translate)
    {
        if (translate instanceof Array)
        {
            this.array[0] = 1.0;  this.array[4] = 0.0;  this.array[8]  = 0.0; this.array[12] = translate[0];
            this.array[1] = 0.0;  this.array[5] = 1.0;  this.array[9]  = 0.0; this.array[13] = translate[1];
            this.array[2] = 0.0;  this.array[6] = 0.0;  this.array[10] = 1.0; this.array[14] = translate[2];
            this.array[3] = 0.0;  this.array[7] = 0.0;  this.array[11] = 0.0; this.array[15] = 1.0;
        } else
            throw new Error("Unsupported Type");
    }

    /**
     * @author Zachary Wartell
     *
     * @description  Right side multiply this Mat4 by a 3D translation matrix that translates by vector [x,y,z], i.e.
     * in mathematical notation, let M equal this Mat4, and M_t equal the translate matrix:
     *
     *     M' = M * M_t
     *
     * @param { Number[] } translation translation vector
     * @param { Number } translation[].0 x
     * @param { Number } translation[].1 y
     * @param { Number } translation[].2 z
     */
    translate (translate)
    {
        if (translate instanceof Array && translate.length === 3)
        {
            const M_t = new Mat4();
            M_t.setTranslate(translate);
            this.multiply(M_t);
        } else
            throw new Error("Unsupported Type");
    }

    /**
     * @author Zachary Wartell
     *
     * @description  Left multiply this Mat4 by a 2D translation matrix that translates by vector [x,y,z], i.e.
     * in mathematical notation, let M equal this Mat4, and M_t equal the translate matrix:
     *
     *     M' = M_t * M
     *
     * @see comment on Mat4.prototype.leftMultiply
     *
     * @param { Number[] } translation translation vector
     * @param { Number } translation[].0 x
     * @param { Number } translation[].1 y
     * @param { Number } translation[].2 z
     */
    leftTranslate (translate)
    {
        if (translate instanceof Array && translate.length === 3)
        {
            const M_t = new Mat4(
                [1.0, 0.0, 0.0, 0.0,
                    0.0, 1.0, 0.0, 0.0,
                    0.0, 0.0, 1.0, 0.0,
                    translate[0], translate[1], translate[2], 1.0]);
            this.leftMultiply(M_t);
        } else
            throw new Error("Unsupported Type");
    }

    /**
     * @author Zachary Wartell && ..
     * @description  set this Mat4 to a new 3D scale matrix that scales by scale factors [sx,sy,sz]
     *
     * @param { Number[] } scale_factors scale factors
     * @param { Number } scale_factors[].0 x
     * @param { Number } scale_factors[].1 y
     * @param { Number } scale_factors[].2 z
     */
    setScale (scale_factors)
    {
        /* \todo implement */
    if (scale_factors instanceof Array)
    {
        this.array[0] = scale_factors[0];
        this.array[1] = 0.0;
        this.array[2] = 0.0;
        this.array[3] = 0.0;
        this.array[4] = 0.0;
        this.array[5] = scale_factors[1];
        this.array[6] = 0.0;
        this.array[7] = 0.0;
        this.array[8] = 0.0;
        this.array[9] = 0.0;
        this.array[10] = scale_factors[2];
        this.array[11] = 0.0;
        this.array[12] = 0.0;
        this.array[13] = 0.0;
        this.array[14] = 0.0;
        this.array[15] = 1.0;
    } 
     //throw new Error("UNIMPLEMENTED FUNCTION");

    }

    /**
     * @author Zachary Wartell && ..
     * @description  Right multiply this Mat4 by the 3D scale matrix that scales by scale factors [sx,sy,sz], i.e.
     * in mathematical notation, let M equal this Mat4, and 'M_s' equal the scale matrix:
     *
     *      M' = M * M_s
     *
     * @param { Number[] } scale_factors scale factors
     * @param { Number } scale_factors[].0 x
     * @param { Number } scale_factors[].1 y
     * @param { Number } scale_factors[].2 z
     */
    scale (scale_factors)
    {
         
         if (scale_factors instanceof Array && scale_factors.length === 3)
        {
            const M_s = new Mat4();
            M_s.setScale(scale_factors);
            this.multiply(M_s);
        } 
        
        /** @todo [STUDENT] REQUIRED: implement
           @hint follow design pattern of Mat4.prototype.translate
        * */
       // throw new Error("UNIMPLEMENTED FUNCTION");
    }

    /**
     * @author Zachary Wartell && ..
     * @description  Left multiply this Mat4 by the 3D scale matrix that scales by scale factors [sx,sy,sz], i.e.
     * in mathematical notation, let M equal this Mat4, and 'M_s' equal the scale matrix:
     *
     *      M' = M_s * M
     *
     * @see comment on Mat4.prototype.leftMultiply
     *
     * @param { Number[] } scale_factors scale factors
     * @param { Number } scale_factors[].0 x
     * @param { Number } scale_factors[].1 y
     * @param { Number } scale_factors[].2 z
     */
    leftScale (scale_factors)
    {
        
     if (scale_factors instanceof Array && scale_factors.length === 3)
        {
            const M_s = new Mat4();
            M_s.setTranslate(scale_factors);
            this.leftMultiply(M_s);
        }
    /** @todo [STUDENT] implement (as needed)
       * Hint: follow design pattern of {@link Mat4.leftTranslate}
       * */
      //  throw new Error("UNIMPLEMENTED FUNCTION");
    }

    /**
     * @author Zachary Wartell && ..
     * @description  set this Mat4 to a new 3D rotation matrix that rotates by angle 'angle' around Z axis
     *
     * @param {Number} angle angle in degrees
     */
    setRotateY (angle)
    {
        const a = angle * (Math.PI / 180),
            c = Math.cos(a),
            s = Math.sin(a);
        this.array.set(      // note column-order convention makes this 'look' transposed
            [ c,   0.0,  -s, 0.0,
              0.0, 1.0, 0.0, 0.0,
              s,   0.0,   c, 0.0,
              0.0, 0.0, 0.0, 1.0]);
    }

    /**
     * @author Zachary Wartell && ..
     * @description  Right multiply this Mat4 by the 3D rotation matrix that rotates by angle 'angle' around Z axis, e.g.
     * in mathematical notation, let M equal this Mat4, and 'M_r' equal the rotation matrix:
     *
     *      M' = M * M_r
     *
     * @param {Number} angle angle in degrees
     */
    rotateY (angle)
    {
        const a = angle * (Math.PI / 180),
            c = Math.cos(a),
            s = Math.sin(a);
        if(0)
        {   // Note: [STUDENT] generally you should follow the approach below (it's the 'easy way' for handling the "right side multiply" functions)
            const M = new Mat4(      // note the column-order convention makes this look incorrect (like the transpose of the desired matrix)
                [c,   0.0,  -s, 0.0,
                 0.0, 1.0, 0.0, 0.0,
                 s,   0.0,   c, 0.0,
                 0.0, 0.0, 0.0, 1.0]);
            this.multiply(M);
        } else
        {   /* Note: For the curious:  Just for fun below is the more 'optimal' solution (i.e. much less arithmetic and memory copies)
               If you ever looked at the source code for a professional rendering engine's matrix library, you'd be amazed how many
               code optimizations you'd find, just in the matrix routines....
             */
            const
                M_00 = this.array[0], M_02 = this.array[8],
                M_10 = this.array[1], M_12 = this.array[9],
                M_20 = this.array[2], M_22 = this.array[10];
            this.array[0]  = M_00 * c + M_02 * -s;
            this.array[1]  = M_10 * c + M_12 * -s;
            this.array[2]  = M_20 * c + M_22 * -s;

            this.array[8]  = M_00 * s + M_02 *  c;
            this.array[9]  = M_10 * s + M_12 *  c;
            this.array[10] = M_20 * s + M_22 *  c;
        }
    }
    rotateZ (angle)
    {
        const a = angle * (Math.PI / 180),
            c = Math.cos(a),
            s = Math.sin(a);
        if(0)
        {   // Note: [STUDENT] generally you should follow the approach below (it's the 'easy way' for handling the "right side multiply" functions)
            const M = new Mat4(      // note the column-order convention makes this look incorrect (like the transpose of the desired matrix)
                [ c,  s,   0.0, 0.0,
                 -s,  c,   0.0, 0.0,
                 0.0, 0.0, 1.0, 0.0,
                 0.0, 0.0, 0.0, 1.0]);
            this.leftmultiply(M);
        } 
       } 
    /**
     * @author Zachary Wartell && ..
     * @description  Left multiply this Mat4 by the 3D rotation matrix that rotates by angle 'angle' around axis Z, e.g.
     * in mathematical notation, let M equal this Mat4, and 'M_r' equal the rotation matrix:
     *
     *      M' = M_r * M
     *
     * @see comment on Mat4.prototype.leftMultiply
     *
     * @param {Number} angle - measured in degrees
     */
    leftRotateY (angle)
    {
        /** @todo [STUDENT] implement (as needed)
         *  @hint follow design pattern of Mat4.leftTranslate
         */
          const a = angle * (Math.PI / 180),
            c = Math.cos(a),
            s = Math.sin(a);
        if(0)
        {   // Note: [STUDENT] generally you should follow the approach below (it's the 'easy way' for handling the "right side multiply" functions)
            const M = new Mat4(      // note the column-order convention makes this look incorrect (like the transpose of the desired matrix)
                 [c,   0.0,  -s, 0.0,
                 0.0, 1.0, 0.0, 0.0,
                 s,   0.0,   c, 0.0,
                 0.0, 0.0, 0.0, 1.0]);
            this.leftmultiply(M);    //
          }  
           
       }      
    /**
     * @author Zachary Wartell
     * @description  set this Mat4 to the identity matrix
     */

     leftRotateZ (angle) //Rotation around z axis
    {
        const a = angle * (Math.PI / 180),
            c = Math.cos(a),
            s = Math.sin(a);
         // Note: [STUDENT] generally you should follow the approach below (it's the 'easy way' for handling the "right side multiply" functions)
            const M = new Mat4(    
                [ c,  s,   0.0, 0.0,
                 -s,  c,   0.0, 0.0,
                 0.0, 0.0, 1.0, 0.0,
                 0.0, 0.0, 0.0, 1.0]);
            this.leftMultiply(M);
    }
    setIdentity ()
    {
        this.array.set(
            [
                1,0,0,0,
                0,1,0,0,
                0,0,1,0,
                0,0,0,1
            ]);
    }


    /**
     * @author Zachary Wartell && ..
     * @description  Set this Mat4 to the canonical OpenGL perspective projection matrix based on fovy, aspect, near and far.
     *
     * (see https://www.khronos.org/registry/OpenGL-Refpages/gl2.1/xhtml/gluPerspective.xml
     *  Note you may need to test these pages in a several browsers. The pages use MathML, a new WWW standard for displaying math;
     *  not all browsers support it equally, see [Cite.4])
     *
     * @param {Number} - fovy : angle between the upper and lower sides of the frustum
     * @param {Number} - aspect : aspect ratio of the frustum. (width/height)
     * @param {Number} - near : distance to the nearer depth clipping plane; value should be > 0.
     * @param {Number} - far : distance to the farther depth clipping plane; value should be > 0.
     * 
     */
    setPerspective(fovy, aspect, near, far)
    {
       
       
    var f = Math.tan(Math.PI * 0.5 - 0.5 * fovy);
    var rangeInv = 1.0 / (near - far);
 
    this.array.set[
      f / aspect, 0, 0, 0,
      0,          f, 0, 0,
      0,          0, -(near + far) * rangeInv, -1,
      0,          0, -near * far * rangeInv * 2, 0
    ]; 
    }
       
 

    /**
     * @author Zachary Wartell && ...
     *
     * @description Right multiply this matrix by canonical OpenGL lookat view matrix (see
     * https://www.khronos.org/registry/OpenGL-Refpages/gl2.1/xhtml/gluLookAt.xml
     *  Note you may need to test these pages in a several browsers. The pages use MathML, a new WWW standard for displaying math;
     *  not all browsers support it equally, see [Cite.4])
     *
     * @param eyeX the position of the eye point.
     * @param eyeY the position of the eye point.
     * @param eyeZ  the position of the eye point.
     * @param centerX the position of the looked at reference point.
     * @param centerY  the position of the looked at reference point.
     * @param centerZ  the position of the looked at reference point.
     * @param upX the direction of the up vector.
     * @param upY the direction of the up vector.
     * @param upZ the direction of the up vector.
     * 
     */
    
    /*function cross(a, b) {
    return [a[1] * b[2] - a[2] * b[1],
          a[2] * b[0] - a[0] * b[2],
          a[0] * b[1] - a[1] * b[0]];
    }
    function normalize(v) {
    var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    return length;
    }
    */

    lookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) //(citation) From webglfundamentals.org for Lookat function
    {
       const s = new Mat4();
        s.setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ);
        this.multiply(s);
    }
   
  
    /**
     * @author Zachary Wartell
     *
     * @description Set this Mat4 to a rotation matrix the rotates around the axis through the origin
     * along vector (x,y,z) by 'angle'
     *
     * (x,y,z) need not be normalized.
     *
     *
     * @param {Number} angle : the angle of rotation (degrees)
     * @param {Number} x : X coordinate of vector of rotation axis.
     * @param {Number} y : Y coordinate of vector of rotation axis.
     * @param {Number} z : Z coordinate of vector of rotation axis.
     * 
     */
    setRotate(angle, x, y, z)
    {
        
        /** @todo [STUDENT] REQUIRED: implement
        *  Hint: see class lecture material, "ITCS 4120-3D Transforms.ppt" - "Rotation About An Arbitrary Axis"
        * 
        */
        var rad=(Math.PI/180) * angle;
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var ab = 1-c;

        this.array[0] = x*x*ab + c;
        this.array[1] = x*y*ab - z*s;
        this.array[2] = x*z*ab + y*s;
        this.array[4] = y*z*ab + z*s;
        this.array[5] = y*y*ab + c;
        this.array[6] = y*z*ab - x*s;
        this.array[8] = z*x*ab - y*s;
        this.array[9] = z*y*ab + x*s;
        this.array[10] = z*z*ab + c;
        this.array[3] = 0.0;
        this.array[7] = 0.0;
        this.array[11] = 0.0;
        this.array[12] = 0.0;
        this.array[13] = 0.0;
        this.array[14] = 0.0;
        this.array[15] = 1.0;

        //throw new Error("UNIMPLEMENTED FUNCTION");
    }

    /**
     * @author Zachary Wartell
     *
     * @description  Right multiply this matrix by the rotation matrix specified by the given angle and axis.
     *
     * @param {Number}  angle : the angle of rotation (degrees)
     * @param {Number}  x : X coordinate of vector of rotation axis
     * @param {Number}  y : Y coordinate of vector of rotation axis
     * @param {Number}  z : Z coordinate of vector of rotation axis
     *
     */
    rotate(angle, x, y, z)
    {
       
        const s = new Mat4();
        s.setRotate(angle,x,y,z);
        this.multiply(s);
       
        /** @todo [STUDENT] REQUIRED: implement
        *  Hint: follow pattern of Mat4.prototype.translate
        * */
       // throw new Error("UNIMPLEMENTED FUNCTION");
    }

    /**
     * @author Zachary Wartell
     * @description Let M be this Mat4: compute and return the minor, M_ij, of this matrix.
     *
     * "A minor M_ij is the reduced determinant of a determinant expansion that is formed by omitting the
     *  ith row and jth column of a matrix M."  (see {@link http://mathworld.wolfram.com/Minor.html})
     *
     * @param {Number} i row to strike out
     * @param {Number} j column to strike out
     * @return {Number} the minor M_ij of this Mat4
     */
    minor (i, j)
    {
        /* @todo [STUDENT] REQUIRED: implement
        * */
        var val;
        switch(i+"&"+j){
            case "0&0":
                val = det3(this.array[5], this.array[6], this.array[7],
                           this.array[9],this.array[10], this.array[11],
                           this.array[13],this.array[14], this.array[15]);
                break;
            case "0&1":
                val = det3(this.array[5], this.array[6], this.array[7],
                           this.array[9],this.array[10], this.array[11],
                           this.array[13],this.array[14], this.array[15]);
                break;
            case "0&2":
                val = det3(this.array[4], this.array[5], this.array[7],
                           this.array[8],this.array[10], this.array[11],
                           this.array[12],this.array[13], this.array[15])
                break;
            case "0&3":
                val = det3(this.array[4], this.array[5], this.array[6],
                           this.array[8],this.array[9], this.array[10],
                           this.array[12],this.array[13], this.array[14])
                break;
            case "1&0":
                val = det3(this.array[1], this.array[2], this.array[3],
                           this.array[9],this.array[10], this.array[11],
                           this.array[13],this.array[14], this.array[15])
                break;
            case "1&1":
                val = det3(this.array[0], this.array[2], this.array[3],
                           this.array[8],this.array[10], this.array[11],
                           this.array[12],this.array[14], this.array[15])
                break;
            case "1&2":
                val = det3(this.array[0], this.array[1], this.array[3],
                           this.array[8],this.array[9], this.array[11],
                           this.array[12],this.array[13], this.array[15])
                break;
            case "1&3":
                val = det3(this.array[0], this.array[1], this.array[2],
                           this.array[8],this.array[9], this.array[10],
                           this.array[12],this.array[13], this.array[14])
                break;
            case "2&0":
                val = det3(this.array[1], this.array[2], this.array[3],
                           this.array[5],this.array[6], this.array[7],
                           this.array[13],this.array[14], this.array[15])
                break;
            case "2&1":
                val = det3(this.array[0], this.array[2], this.array[3],
                           this.array[4],this.array[6], this.array[7],
                           this.array[12],this.array[14], this.array[15])
                break;
            case "2&2":
                val = det3(this.array[0], this.array[1], this.array[3],
                           this.array[4],this.array[5], this.array[7],
                           this.array[12],this.array[13], this.array[15])
                break;
            case "2&3":
                val = det3(this.array[0], this.array[1], this.array[2],
                           this.array[4],this.array[5], this.array[6],
                           this.array[12],this.array[13], this.array[14])
                break;
            case "3&0":
                val = det3(this.array[1], this.array[2], this.array[3],
                           this.array[5],this.array[6], this.array[7],
                           this.array[9],this.array[10], this.array[11])
                break;
            case "3&1":
                val = det3(this.array[0], this.array[2], this.array[3],
                           this.array[4],this.array[6], this.array[7],
                           this.array[8],this.array[10], this.array[11])
                break;
            case "3&2":
                val = det3(this.array[0], this.array[1], this.array[3],
                           this.array[4],this.array[5], this.array[7],
                           this.array[8],this.array[9], this.array[11])
                break;
            case "3&3":
                val = det3(this.array[0], this.array[1], this.array[2],
                           this.array[4],this.array[5], this.array[6],
                           this.array[8],this.array[9], this.array[10])
                break;
             default: console.log('this is for 4x4 Matrices');   
        }
        return val;
        //throw new Error("UNIMPLEMENTED FUNCTION");
    }

    /**
     * @author Zachary Wartell && ..
     * @description  Set this Mat4 to a new matrix equal to cofactor matrix of matrix 'M'
     * (In some math texts, 'cofactor matrix' is also called the 'matrix of co-factors').
     *
     * See {@link http://mathworld.wolfram.com/Cofactor.html }
     *
     * @param {Mat4} M
     */
    setCofactorMatrix (M)
    {
        /* @todo [STUDENT REQUIREMENT] implement this.
        *  Hints:
        *    - utilize Mat4.prototype.minor
        *    - use the cofactor definition in class (see also http://mathworld.wolfram.com/Cofactor.html)
        * */
         var row, col
        for(row = 0; row < 4; row++){
                for(col = 0; col < 4;col++){
                 M.array[col*4+row] = M.minor(row,col)*Math.pow(-1, row+col);
                }
            }
        //throw new Error("UNIMPLEMENTED FUNCTION");
    }
    /**
     * @author Zachary Wartell && ..
     * @description  set this matrix to the inverse of matrix 'M'
     *
     * @param {Mat4} - M : the matrix to compute inverse of
     * @throw throw Error() if matrix is not invertible
     */
    setInverseOf(M)
    {
        /* @todo [STUDENT REQUIREMENT] implement
        Hint: leverage Mat4.prototype.setCofactorMatrix, etc., using mathematical definition of matrix inverse given in class
        ("ITCS 4120 - 2D Coordinates.ppt")
        */

        var det = det4(M.array[0],M.array[1],M.array[2],M.array[3],
                    M.array[4], M.array[5],M.array[6],M.array[7],
                    M.array[8],M.array[9],M.array[10],M.array[11],
                    M.array[12],M.array[13],M.array[14],M.array[15]); // Finding Inverse using cofactors 
        M.setCofactorMatrix(M);
        this.array[0] = M.array[0] / det; 
        this.array[4] = M.array[1] / det; 
        this.array[8] = M.array[2] / det; 
        this.array[12] = M.array[3]/ det;
        this.array[1] = M.array[4] / det; 
        this.array[5] = M.array[5] / det; 
        this.array[9] = M.array[6] / det; 
        this.array[13] = M.array[7]/ det;
        this.array[2] = M.array[8] / det; 
        this.array[6] = M.array[9] / det; 
        this.array[10]= M.array[10]/ det; 
        this.array[14]= M.array[11]/ det;
        this.array[3] = M.array[12]/ det; 
        this.array[7] = M.array[13]/ det; 
        this.array[11]= M.array[14]/ det; 
        this.array[15]= M.array[15]/ det;
        //throw new Error("UNIMPLEMENTED FUNCTION");
    }

    /** Zachary Wartell && ..
     * @description set to this Mat4 its own inverse
     * 
     */
    invert()
    {
        this.setInverseOf(this);
    }


    /**
     * @author Zachary Wartell && ...
     * @description  set this matrix to the matrix transpose of itself.
     * 
     */
    transpose()
    {
        var temp; //
        temp = this.array[1];  this.array[1] = this.array[4];  this.array[4] = temp;
        temp = this.array[2];  this.array[2] = this.array[8];  this.array[8] = temp;
        temp = this.array[3];  this.array[3] = this.array[12];  this.array[12] = temp;
        temp = this.array[6];  this.array[6] = this.array[9];  this.array[9] = temp;
        temp = this.array[7];  this.array[7] = this.array[13];  this.array[13] = temp;
        temp = this.array[11];  this.array[11] = this.array[14];  this.array[14] = temp;
        /** @todo [STUDENT] REQUIRED: implement */
       // throw new Error("UNIMPLEMENTED FUNCTION");
    }

    /**
     * @author Zachary Wartell && ...
     * @description  Set this Mat4 to the standard OpenGL viewing matrix
     *
     * (see https://www.khronos.org/registry/OpenGL-Refpages/gl2.1/xhtml/gluLookAt.xml
     *  Note you may need to test these pages in a several browsers. The pages use MathML, a new WWW standard for displaying math;
     *  not all browsers support it equally, see [Cite.4])
     *
     *
     * @param eyeX the position of the eye point.
     * @param eyeY the position of the eye point.
     * @param eyeZ  the position of the eye point.
     * @param centerX the position of the looked at reference point.
     * @param centerZ  the position of the looked at reference point.
     * @param centerZ  the position of the looked at reference point.
     * @param upX the direction of the up vector.
     * @param upY the direction of the up vector.
     * @param upZ the direction of the up vector.
     * 
     */
      
    
    setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ)
    {
  
        

   
    }
}  
    



const Vec4_SIZE=4;

/**
 * @author Zachary Wartell 
 * @class  Vec4 represents one of several different types of geometric objects or linear algebra objects.
 * Vec4 represents either:
 *    - homogenous coordinates of points in 3D projective space, i.e. points or points-at-infinity, stored as (x,y,z,w)
 *    OR
 *    - 'regular' coordinates of points or vectors in 3D affine space, encoded as (x,y,z,1) or (x,y,z,0)
 * 
 * For operations combining Mat4 and Vec4, Vec4 is typically treated as a column matrix:
 * ```
 *         | x |
 *         | y |
 *         | z | 
 *         | w |
 * ```
 * However, some Mat4 methods treat Vec4 as a row matrix [x y z w]
 */
class Vec4
{
    /**
     * Construct new Vec4
     * @author Zachary Wartell
     *
     * @param {null | Number[] | Float32Array | Vec4 | ...Number } x,y,z,w - [default] [0,0,0,1] | Array (size 4) | Float32Array (size 4) | Vec4 | 4 Numbers
     */
    constructor()
    {
        this.array = new Float32Array(Vec4_SIZE);
        if (arguments.length === 0)
            // no arguments, so initialize to (0,0,0,1)
            this.array.set([0.0, 0.0, 0.0,1.0]);
        else if (arguments.length === 1)
        {
            if ( arguments[0] instanceof Array)
                this.array.set(arguments[0]);
            else if ( arguments[0] instanceof Vec4)
                this.array.set(arguments[0].array);
            else
                throw new Error("Unsupported Type");//
        } else
            this.set(...arguments); // ES6 'spread' operator
    }

    /**
     * @author Zachary Wartell && ..
     *
     * @description  Treat this Vec4 as a column matrix and multiply it by Mat4 M on it's left, i.e.
     * mathematically, denoting this Vec4 as "v":
     *   v' = M v
     *
     * @param {Mat4} M
     */
    multiply (M)
    {
        if (!(M instanceof Mat4))
            throw new Error("Unsupported Type");
        else {
        this.array.set(
        [this.array[0] * M.array[0] + this.array[1] * M.array[4] + this.array[2] * M.array[8] + this.array[3] * M.array[12],
        this.array[0] * M.array[1] + this.array[1] * M.array[5] + this.array[2] * M.array[9] + this.array[3] * M.array [13],
        this.array[0] * M.array[2] + this.array[1] * M.array[6] + this.array[2] * M.array[10] + this.array[3]* M.array[14],
        this.array[0] * M.array[3] + this.array[1] * M.array[7] + this.array[2] * M.array[11] + this.array[3]* M.array[15]
        ]);
        }
        // @todo [STUDENT] REQUIRED: implement
       // throw new Error("UNIMPLEMENTED FUNCTION");
    }

    /**
     * @author Zachary Wartell && ..
     *
     * @description  Treat this Vec4 as a row matrix and multiply it by Mat4 M on it's right, i.e.
     * mathematically, denoting this Vec4 as "v"
     *    v' = v M
     *
     * For many calculations Vec4.multiply (a 'left multiply') is sufficient, but occasionally being able to rightMultiply is useful.
     *
     * @param {Mat4} M
     */
    rightMultiply (M)
    {
        if (!(M instanceof Mat4))
            throw new Error("Unsupported Type");
        else {
    this.array.set([
    this.array[0] * M.array[0] + this.array[1] * M.array[1] + this.array[2] * M.array[2] + this.array[3] * M.array[3], 
    this.array[0] * M.array[4] + this.array[1] * M.array[5] + this.array[2] * M.array[6] + this.array[3] * M.array[7], 
    this.array[0] * M.array[8] + this.array[1] * M.array[9] + this.array[2] * M.array[10] + this.array[3] * M.array[11], 
    this.array[0] * M.array[12] + this.array[1] * M.array[13] + this.array[2] * M.array[14] + this.array[3] * M.array[15]
    ]);
        }
        // @todo [STUDENT] implement (as needed)
        //throw new Error("UNIMPLEMENTED FUNCTION");
    }

    /**
     * @author Zachary Wartell
     * 
     * @description initialize a new Vec4
     *
     * Arguement Options [Overloaded]:
     * - Number[] : x,y,w,z values (size 4)
     * - Float32Array : x,y,w,z values (size 4)
     * - Vec4 : x,y,w,z values
     * - Vec3 , Number : x,y,w,z values (Vec3 -> x,y,z; Number -> w)
     * - Number, Number , Number, Number : x,y,w,z values
     * @param {*} - initial value see description for for details
     */
    set ()
    {
        if (arguments.length === 1)
        {
            if (arguments[0] instanceof Array)
                this.array.set(arguments[0]);
            else if (arguments[0] instanceof Float32Array)
                this.array.set(arguments[0]);
            else if (arguments[0] instanceof Vec4)
                this.array.set(arguments[0].array);
            else
                throw new Error("Unsupported Type");
        } else if (arguments.length === 2) {
            if (arguments[0] instanceof Vec3 && typeof arguments[1] === 'number')
            {
                this.x = arguments[0].x;
                this.y = arguments[0].y;
                this.z = arguments[0].z;
                this.w = arguments[1];
            } else
                throw new Error("Unsupported Type");
        } else if (arguments.length === Vec4_SIZE) {
            this.array.set(arguments);
        } else
            throw new Error("Unsupported Type");
    }

    /**
     * @todo [STUDENT] (as needed) add other methods based on common linear algebra vector operations
      */

    /**
     * @author Zachary Wartell
     * @description getter for x-coordinate
     */


    get x(){
        return this.array[0];
    }

    /**
     * @author Zachary Wartell
     * @description setter for x-coordinate
     */
    set x(x_){
        this.array[0] = x_;
    }

    /**
     * @author Zachary Wartell
     * @description getter for y-coordinate
     */
    get y(){
        return this.array[1];
    }

    /**
     * @author Zachary Wartell
     * @description setter for y-coordinate
     */
    set y(y_){
        this.array[1] = y_;
    }

    /**
     * @author Zachary Wartell
     * @description getter for z-coordinate
     */
    get z(){
        return this.array[2];
    }

    /**
     * @author Zachary Wartell
     * @description setter for z-coordinate
     */
    set z(z_){
        this.array[2] = z_;
    }

    /**
     * @author Zachary Wartell
     * @description getter for w-coordinate
     */
    get w(){
        return this.array[3];
    }

    /**
     * @author Zachary Wartell
     * @description setter for w-coordinate 
     */
    set w(w_){
        this.array[3] = w_;
    }
}


/**
 * @author Zachary Wartell && ... 
 * @description  This contains misc. example code for testing and demonstrating the methods in this file.
 * 
 * Student Note: The tests are not meant to be comprehensive, but rather only provide examples.  Also,
 * Mat4_test may include calls to methods & functions not required by your particular assignment in a given
 * semester.  Edit it as needed.
 * @todo [STUDENT] (as needed) add/alter this function for testing your Mat4 code, etc.  Note,
 *
 */
function Mat4_test()
{
    var M1 = new Mat3();
    var M2 = new Mat4();
    var v0 = new Vec3(), v1 = new Vec3([5.0, 5.0,5.0]), v2,
        vx = new Vec3([1.0, 0.0,0.0]),
        vy = new Vec3([0.0, 1.0,0.0]),
        vx_h = new Vec4([1.0, 0.0, 0.0,0.0]), /* 'h' is for homogenous coordinate */
        vy_h = new Vec4(0.0, 1.0, 0.0,0.0),
        po_h = new Vec4();

    var rad = 45 * Math.PI / 180;
    M1.set(0, 0, Math.cos(rad));
    M1.set(0, 1, -Math.sin(rad));
    M1.set(1, 0, Math.sin(rad));
    M1.set(1, 1, Math.cos(rad));

    M2.set(0, 0, Math.cos(rad));
    M2.set(0, 1, -Math.sin(rad));
    M2.set(1, 0, Math.sin(rad));
    M2.set(1, 1, Math.cos(rad));

    v0.x = 1.0;
    v0.y = 2.0;
    v0.y += 1.0;
    v0.z = 3.0;
    v2 = new Vec3(v0);
    v2.add(v1);
    console.assert(v2.x === 6 && v2.y === 8 && v2.z === 8);

    vx.multiply(M1);
    vy.multiply(M1);

    console.assert(equalfd(vy.x, -Math.sin(rad)) && equalfd(vy.y, Math.cos(rad)) &&
            equalfd(vx.x, Math.cos(rad)) && equalfd(vx.y, Math.sin(rad)));

    var po = new Vec3([0,0]);
    po_h.set (po,1);

    vx_h.multiply(M2);
    vy_h.multiply(M2);
    po_h.multiply(M2);
    console.assert(equalfd(vy_h.x, -Math.sin(rad)) && equalfd(vy_h.y, Math.cos(rad)) &&
            equalfd(vx_h.x, Math.cos(rad)) && equalfd(vx_h.y, Math.sin(rad)));

    var M3 = new Mat4();
    M3.setTranslate([10.0, 15.0,20.0]);
    M3.translate([5.0, 5.0,5.0]);
    po_h.multiply(M3);

    console.assert(equalfd(po_h.x, 15) && equalfd(po_h.y, 20));

    var M4 = new Mat4(), M5 = new Mat4();

    M4.setTranslate([10, 10, 10]);
    M4.rotateZ(50);
    M4.scale([5, 10, 15]);

    M5.setTranslate([-10, -10, -10]);
    M5.leftRotateZ(-50);
    M5.leftScale([1 / 5, 1 / 10, 1/ 15]);

    MI = new Mat4(M5);
    MI.multiply(M4);

    var M6 = new Mat4();
    M6.set([1, 2, 3, 4, 5, 3, 5, 2, 9, 12, 31, 12, 13, 12, 255, 16])
    var M7 = new Mat4();
    M7.setCofactorMatrix(M6);
    var M6_cf = new Mat4([2, 2, -3, 4, -11, 6,-3, 6, -3]);
    /* @todo add more tests as needed */
    console.log("Mat4_test is passed");
    return;
}
