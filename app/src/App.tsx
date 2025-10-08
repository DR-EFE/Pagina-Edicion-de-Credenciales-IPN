import React, { useState, useRef, ChangeEvent } from 'react';
import domtoimage from 'dom-to-image-more';
import './App.css';
import credentialBackgroundFront from './assets/IMAGEN DE FONDO.jpeg';
import credentialBackgroundBack from './assets/IMAGEN DE FONDO TRASERA.jpeg';

function App() {
    const [currentView, setCurrentView] = useState<'front' | 'back'>('front'); // New state for view
    const [name, setName] = useState('');
    const [boleta, setBoleta] = useState('');
    const [program, setProgram] = useState('INGENIERÍA EN INFORMATICA');
    const [customProgram, setCustomProgram] = useState('');
    const [photo, setPhoto] = useState<string | null>(null);
    const [curp, setCurp] = useState(''); // New state for CURP
    const [loading, setLoading] = useState(false);

    const credentialFrontRef = useRef<HTMLDivElement>(null);
    const credentialBackRef = useRef<HTMLDivElement>(null); // New ref for back
    const photoUploadRef = useRef<HTMLInputElement>(null);

    const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // Corregido para validar 5MB correctamente
                alert('⚠️ La imagen es demasiado grande. Por favor, selecciona una imagen menor a 5MB.');
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                setPhoto(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProgramChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === 'other') {
            setProgram('');
        } else {
            setProgram(value);
        }
    };
    
    const handleDownload = async () => {
        if (currentView === 'front' && (!name || !boleta)) {
            alert('⚠️ Por favor, completa al menos el nombre y número de boleta antes de descargar el anverso.');
            return;
        }
        if (currentView === 'front' && boleta.length < 6) {
            alert('⚠️ El número de boleta debe tener al menos 6 dígitos para el anverso.');
            return;
        }
        if (currentView === 'back' && !curp) {
            alert('⚠️ Por favor, ingresa la CURP antes de descargar el reverso.');
            return;
        }

        const credentialNode = currentView === 'front' ? credentialFrontRef.current : credentialBackRef.current;

        if (credentialNode) {
            setLoading(true);
            try {
                const scale = 3; // Aumentamos la escala para mayor resolución
                const dataUrl = await domtoimage.toPng(credentialNode, {
                    width: credentialNode.offsetWidth * scale,
                    height: credentialNode.offsetHeight * scale,
                    style: {
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        width: `${credentialNode.offsetWidth}px`,
                        height: `${credentialNode.offsetHeight}px`
                    }
                });

                const link = document.createElement('a');
                const fileName = `Credencial_${currentView === 'front' ? name.replace(/\s+/g, '_') + '_' + boleta : 'Reverso'}.png`;
                link.download = fileName;
                link.href = dataUrl;
                link.click();
                alert('✅ ¡Credencial descargada exitosamente!');
            } catch (error) {
                console.error('❌ Error al generar la credencial:', error);
                alert('❌ Error al generar la credencial. Por favor, intenta nuevamente.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleReset = () => {
        setName('');
        setBoleta('');
        setProgram('INGENIERÍA EN SISTEMAS COMPUTACIONALES');
        setCustomProgram('');
        setPhoto(null);
        setCurp(''); // Clear CURP on reset
        if(photoUploadRef.current) {
            photoUploadRef.current.value = '';
        }
    };

    return (
        <div className="container">
            {loading && (
                <div className="loading" style={{ display: 'flex' }}>
                    <div className="loading-content">
                        <div className="spinner"></div>
                        <p>Generando credencial...</p>
                    </div>
                </div>
            )}

            <div className="control-panel">
                <h2>📝 Editor de Credencial</h2>
                <div className="view-switcher">
                    <button 
                        className={`btn ${currentView === 'front' ? 'active' : ''}`} 
                        onClick={() => setCurrentView('front')}
                    >
                        Anverso
                    </button>
                    <button 
                        className={`btn ${currentView === 'back' ? 'active' : ''}`} 
                        onClick={() => setCurrentView('back')}
                    >
                        Reverso
                    </button>
                </div>
                
                {currentView === 'front' && (
                    <>
                        <div className="form-group">
                            <label htmlFor="photoUpload">📸 Foto del Estudiante</label>
                            <div className="file-input-wrapper">
                                <input type="file" id="photoUpload" className="file-input" accept="image/*" onChange={handlePhotoUpload} ref={photoUploadRef} />
                                <button type="button" className="file-input-button" onClick={() => photoUploadRef.current?.click()}>
                                    Subir Fotografía
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="nameInput">👤 Nombre Completo</label>
                            <input type="text" id="nameInput" placeholder="APELLIDOS NOMBRE" value={name} onChange={(e) => setName(e.target.value.toUpperCase())} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="boletaInput">🔢 Número de Boleta</label>
                            <input type="text" id="boletaInput" placeholder="2022601075" maxLength={15} value={boleta} onChange={(e) => setBoleta(e.target.value.replace(/[^0-9]/g, ''))} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="programSelect">📚 Programa Académico</label>
                            <select id="programSelect" value={program || 'other'} onChange={handleProgramChange}>
                                <option value="INGENIERÍA EN INFORMÁTICA">INGENIERÍA EN INFORMÁTICA</option>
                                <option value="INGENIERÍA INDUSTRIAL">INGENIERÍA INDUSTRIAL</option>
                                <option value="INGENIERÍA EN SISTEMAS COMPUTACIONALES">INGENIERÍA EN SISTEMAS COMPUTACIONALES</option>
                                <option value="LICENCIATURA EN CIENCIAS DE LA INFORMÁTICA">LICENCIATURA EN CIENCIAS DE LA INFORMÁTICA</option>
                                <option value="INGENIERÍA EN TRANSPORTE">INGENIERÍA EN TRANSPORTE</option>
                                <option value="CONTADOR PÚBLICO">CONTADOR PÚBLICO</option>
                                <option value="LICENCIATURA EN ADMINISTRACIÓN INDUSTRIAL">LICENCIATURA EN ADMINISTRACIÓN INDUSTRIAL</option>
                                <option value="other">Otro...</option>
                            </select>
                        </div>

                        {program === '' && (
                            <div className="form-group">
                                <input type="text" id="customProgram" placeholder="Escribir programa personalizado..." value={customProgram} onChange={(e) => setCustomProgram(e.target.value.toUpperCase())} />
                            </div>
                        )}
                    </>
                )}

                {currentView === 'back' && (
                    <div className="form-group">
                        <label htmlFor="curpInput">🪪 CURP</label>
                        <input type="text" id="curpInput" placeholder="Ingrese CURP" value={curp} onChange={(e) => setCurp(e.target.value.toUpperCase())} maxLength={18} />
                    </div>
                )}

                <button className="btn btn-download" onClick={handleDownload}>
                    💾 Descargar Credencial
                </button>
                
                <button className="btn btn-reset" onClick={handleReset}>
                    🔄 Limpiar Campos
                </button>

                <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.85rem', color: '#666' }}>
                    <strong>💡 Instrucciones:</strong><br />
                    • Usa el panel lateral para editar los campos<br />
                    • La vista previa se actualiza en tiempo real
                </div>
            </div>

            <div className="credential-wrapper">
                {currentView === 'front' && (
                    <div className="credential-container" id="credentialFrontContainer" ref={credentialFrontRef}>
                        <img src={credentialBackgroundFront} alt="Credencial IPN Anverso" className="credential-background" />
                        
                        <div className="student-photo">
                            {photo && <img src={photo} alt="Foto del estudiante" />}
                        </div>
                        
                        <div className="editable-field field-name">{name}</div>
                        <div className="editable-field field-boleta">{boleta}</div>
                        <div className="editable-field field-program">{program === '' ? customProgram : program}</div>
                    </div>
                )}

                {currentView === 'back' && (
                    <div className="credential-container" id="credentialBackContainer" ref={credentialBackRef}>
                        <img src={credentialBackgroundBack} alt="Credencial IPN Reverso" className="credential-background" />
                        
                        <div className="editable-field field-curp">{curp}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;