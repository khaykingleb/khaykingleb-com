import { useEffect, useRef } from "react";

/**
 * A component that renders an animated ASCII art donut
 * Based on the donut math by Andy Sloane
 * @see https://www.a1k0n.net/2011/07/20/donut-math.html
 * @returns The ASCII art donut component
 */
export function AsciiDonut() {
  const canvasRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const theta_spacing = 0.07; // The spacing between the theta angles
    const phi_spacing = 0.02; // The spacing between the phi angles

    const R1 = 1; // Radius of the torus
    const R2 = 2; // Radius of the tube
    const K2 = 5; // Number of twists

    /**
     * Render a single frame of the ASCII art donut
     * @param A - The angle for the torus rotation
     * @param B - The angle for the torus rotation
     * @returns The ASCII art string for the frame
     */
    function renderFrame(A: number, B: number) {
      const screenWidth = 900;
      const screenHeight = 900;
      const K1 = (screenWidth * K2 * 3) / (8 * (R1 + R2));

      const cosA = Math.cos(A),
        sinA = Math.sin(A);
      const cosB = Math.cos(B),
        sinB = Math.sin(B);

      const chars = ".,-~:;=!*#$@".split("");
      const output: string[] = new Array(screenWidth * screenHeight).fill(" ");
      const zbuffer: number[] = new Array(screenWidth * screenHeight).fill(0);

      for (let theta = 0; theta < 2 * Math.PI; theta += theta_spacing) {
        const costheta = Math.cos(theta),
          sintheta = Math.sin(theta);

        for (let phi = 0; phi < 2 * Math.PI; phi += phi_spacing) {
          const cosphi = Math.cos(phi),
            sinphi = Math.sin(phi);

          const circlex = R2 + R1 * costheta;
          const circley = R1 * sintheta;

          const x =
            circlex * (cosB * cosphi + sinA * sinB * sinphi) -
            circley * cosA * sinB;
          const y =
            circlex * (sinB * cosphi - sinA * cosB * sinphi) +
            circley * cosA * cosB;
          const z = K2 + cosA * circlex * sinphi + circley * sinA;
          const ooz = 1 / z;

          const xp = Math.floor(screenWidth / 2 + K1 * ooz * x);
          const yp = Math.floor(screenHeight / 2 - K1 * ooz * y);

          const L =
            cosphi * costheta * sinB -
            cosA * costheta * sinphi -
            sinA * sintheta +
            cosB * (cosA * sintheta - costheta * sinA * sinphi);

          if (L > 0) {
            const idx = xp + yp * screenWidth;
            if (xp >= 0 && xp < screenWidth && yp >= 0 && yp < screenHeight) {
              if (ooz > zbuffer[idx]) {
                zbuffer[idx] = ooz;
                const luminance_index = Math.floor(L * 8);
                output[idx] =
                  chars[
                    Math.min(Math.max(luminance_index, 0), chars.length - 1)
                  ];
              }
            }
          }
        }
      }

      return output.reduce((acc, char, i) => {
        if (i % screenWidth === 0) return acc + "\n" + char;
        return acc + char;
      }, "");
    }

    let A_val = 0;
    let B_val = 0;

    const animate = () => {
      if (canvasRef.current) {
        canvasRef.current.textContent = renderFrame(A_val, B_val);
        // The speed of the torus rotation
        A_val += 0.005;
        B_val += 0.003;
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, []);

  return (
    <pre
      ref={canvasRef}
      className="fixed left-[70%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-[0.125rem] font-extralight leading-[0.0625rem] 2xl:left-[50%]"
    />
  );
}
