import Particles from 'react-particles-js';
import './Particles.styles.css'

const MyParticles = () => {
    return (
        <Particles
            className="particles"
            params={{
                particles: {
                    number: {
                        value: 60,
                        density: {
                            enable: true,
                            value_area: 800,
                        }
                    }
                }
            }}
            style={{
                width: '100%',
            }}
        />)
}

export default MyParticles;